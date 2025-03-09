import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';
import * as Effects from 'redux-saga/effects';
import { select } from 'redux-saga/effects';

import { BASE_URL } from '@/utils/environment';
import ToastPopUp from '@/utils/Toast.android';

import {
  offLineUpdateTransactionAction,
  successfullyQueryTransactionsAction,
  successfullySubmitAllSyncDataAction,
  successfullySyncQueryTransactionsAction,
  updateAlterRejectList,
  updateAlterRejectListOffline,
  updateTransactionAction
} from '../slices/features/endTableCheck/slice';
import { getGraphDataAction } from '../slices/features/getTodaysHourWiseProductionBar/slice';
import { successfullyRepairQueryTransactionsAction } from '../slices/features/repairedEndTableCheck/slice';
import { type APIQualityTransaction } from '../types/types';
import { type RootState } from '..';
const { call, put } = Effects;
const apiUrl = BASE_URL + '/' + 'api/v1/qualityTransactions';

const callBackAPI = async (payload: any): Promise<APIQualityTransaction | undefined> => {
  try {
    // Explicitly handle potential undefined values
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const payloadData = payload?.payload !== undefined ? payload.payload : [];

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    // Ensure that token is concatenated as a string
    myHeaders.append('Authorization', `Bearer ${token}`);

    const raw = JSON.stringify(payloadData);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow' as RequestRedirect // Use the correct enum value here
    };

    const res: APIQualityTransaction | undefined = await fetch(apiUrl, requestOptions)
      .then(async response => await response.json())
      .catch(error => {
        throw error;
      });
    return res;
  } catch (error) {
    console.error('Error in callBackAPI:', error);
    return undefined;
  }
};

export function* callBack(
  payload: any
): Generator<any, APIQualityTransaction | undefined, APIQualityTransaction | undefined> {
  try {
    const accessToken = yield select((state: RootState) => state.users.user.data?.accessToken);

    // Use a more explicit check for accessToken
    const tokenToUse = accessToken !== undefined ? accessToken : 'no token';

    const payloadIs = {
      payload,
      accessToken: tokenToUse
    };
    const response = yield call(callBackAPI, payloadIs);

    return response;
  } catch (error) {
    return undefined;
  }
}

export const checkInternetConnection = async (): Promise<boolean | null> => {
  const state: NetInfoState = await NetInfo.fetch();
  return state.isConnected;
};

// alter or reject Transactions from end Table Check
export function* alterOrRejectQualityTransactionsListFunc(payload: any): Generator<any, void, any> {
  try {
    // offline update
    const isConnected: boolean = yield call(checkInternetConnection);

    if (isConnected) {
      // or online update
      yield put(updateAlterRejectList(payload));
    } else {
      // or offline update
      yield put(updateAlterRejectListOffline(payload));
    }
  } catch (error) {
    // Handle error if needed
    ToastPopUp('Error occurred. Please Try again later.');
  }
}
// pass Transactions from end Table Check
export function* passQualityTransactionsListFunc(payload: any): Generator<any, void, any> {
  try {
    const isConnected: boolean = yield call(checkInternetConnection);

    const repaired = yield select((state: RootState) => state.endTableCheck.repaired);
    const repairedPass = yield select(
      (state: RootState) => state.repairEndTableCheck.repairPassValue
    );
    const repairAlterValue = yield select(
      (state: RootState) => state.repairEndTableCheck.repairAlterValue
    );
    const repairRejectValue = yield select(
      (state: RootState) => state.repairEndTableCheck.repairRejectValue
    );

    // repair mode check
    if (repaired === true) {
      const objIs = {
        errors: '',
        repairPassValue: parseInt(repairedPass as string) + 1,
        repairAlterValue,
        repairRejectValue
      };
      yield put(successfullyRepairQueryTransactionsAction(objIs));
    }

    if (isConnected) {
      yield put(successfullyQueryTransactionsAction(payload));
      const data = 'Pass successfully.';
      ToastPopUp(data);
    } else {
      // no internet store later Sync
      yield put(successfullySyncQueryTransactionsAction(payload));
      // update repair status
      const data = 'Pass successfully.';
      ToastPopUp(data);
    }
  } catch (error) {
    // Handle error if needed
    ToastPopUp('Error occurred');
  }
}

export function* updateTransactionsListFunc(payload: any): Generator<any, void, any> {
  try {
    const isConnected: boolean = yield call(checkInternetConnection);

    if (isConnected) {
      //  internet
      yield put(updateTransactionAction());
    } else {
      // no internet store later Sync
      yield put(offLineUpdateTransactionAction());
    }
  } catch (error) {
    // Handle error if needed
    ToastPopUp('Error occurred Update');
  }
}

// offline Data
export function* submitOfflineQueryTransactionFunc(payload: any): Generator<any, boolean, any> {
  try {
    const isConnected: boolean = yield call(checkInternetConnection);

    if (isConnected) {
      //  internet

      const response: APIQualityTransaction | undefined = yield call(callBack, payload);

      if (response != null && response !== undefined) {
        yield put(getGraphDataAction());
        yield put(successfullySubmitAllSyncDataAction());

        return true;
      } else {
        return false;
        // failed submit
      }
    } else {
      // no internet store later Sync
      // yield put(offLineUpdateTransactionAction());
      return false;
    }
  } catch (error) {
    // Handle error if needed\
    ToastPopUp('Error occurred Update');
    return false;
  }
}
