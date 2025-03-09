import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import moment from 'moment';
import * as Effects from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import {
  deleteAllTransaction,
  deleteLastTransaction,
  updateOfflineCount
} from '@/helpers/TransectionHelper';
import { type RootState } from '@/store';
import { GenerateUniqueID } from '@/utils/arrayGenarator';
import { BASE_URL } from '@/utils/environment';
import ToastPopUp from '@/utils/Toast.android';

import database from '../database';
import {
  checkDefectEntryTableDefectType,
  undoLastEndTableDefectItemCount
} from '../database/helper/defectEntry.helper';
import { type DefectEntry } from '../database/model/defectEntry.model';
import { resetDefect } from '../slices/features/Defect/slice';
import { type IQualityDefect } from '../slices/features/Defect/types';
import { resetTempQualityDefect } from '../slices/features/DefectList/slice';
import {
  setReportColorValue,
  stopEndTableLoader,
  stopLoaderReportColor
} from '../slices/features/endTableCheck/slice';
import {
  type ColorAndSizeOutput,
  type IQualityData,
  type IQualityDefectAPI
} from '../slices/features/endTableCheck/types';
import { getGraphDataAction } from '../slices/features/getTodaysHourWiseProductionBar/slice';

import {
  alterOrRejectQualityTransactionsListFunc,
  passQualityTransactionsListFunc,
  submitOfflineQueryTransactionFunc,
  updateTransactionsListFunc
} from './qualityTransactionsList.saga';
const { call, select } = Effects;

// modify defect array
export function* createDefectOrRejectArray(
  payload: string
): Generator<any, IQualityDefectAPI[], any> {
  try {
    const defectList: IQualityDefect[] = yield select(
      (state: RootState) => state.defectList.tempQualityDefect
    );
    let returnData: IQualityDefectAPI[] = [];

    if (defectList != null && defectList.length > 0) {
      returnData = defectList.map(({ defecType, defect, ...rest }: any) => ({
        ...rest,
        defect: {
          id: defect.id
        },
        organization: rest.organization,
        imageId: rest.imageId,
        partId: rest.partId,
        positionX: rest.positionX,
        positionY: rest.positionY,
        operation: rest.operation
      }));
    }

    return returnData;
  } catch (err) {
    return [];
  }
}

export function* createParamsArray(payload: string): Generator<any, IQualityData[], any> {
  const pramsList: IQualityData[] = [];
  const pramsObj: IQualityData = {
    orderEntity: {
      id: 0
    },
    workProcess: {
      id: 0
    },
    organization: {
      id: 0
    },
    style: {
      id: ''
    },
    qualityType: {
      id: 0
    },
    newQualityDefect: [],
    sampleSize: 0,
    checkOutput: '',
    productionTime: '',
    transactionId: '',
    deviceId: '',
    isRepaired: false
  };

  const orderEntity = yield select((state: RootState) => state.setLineStyle.orderId);
  const organization = yield select((state: RootState) => state.setting.selectedLineID);
  const styleId = yield select((state: RootState) => state.setLineStyle.styleID);
  const qualityType = yield select((state: RootState) => state.endTableCheck.qualityType);
  const workProcess = yield select((state: RootState) => state.endTableCheck.workProcess);
  const checkOutput = payload; // “ok” , ‘alter’, ‘reject’
  const sampleSize = 1;
  const newCreateAtString = moment().format('YYYY-MM-DDTHH:mm:ss');
  const deviceId = yield call(DeviceInfo.getUniqueId);
  const repaired = yield select((state: RootState) => state.endTableCheck.repaired);
  const variance = yield select((state: RootState) => state.endTableCheck.varianceSelected);

  const defectList = yield call(createDefectOrRejectArray, '');

  pramsObj.deviceId = deviceId.toString();
  pramsObj.isRepaired = repaired;
  pramsObj.transactionId = GenerateUniqueID();
  pramsObj.checkOutput = checkOutput;
  pramsObj.productionTime = newCreateAtString;
  pramsObj.orderEntity.id = parseInt(orderEntity);
  pramsObj.organization.id = organization;
  pramsObj.style.id = styleId;
  pramsObj.workProcess.id = workProcess;
  pramsObj.sampleSize = sampleSize;
  pramsObj.qualityType.id = parseInt(qualityType);
  pramsObj.newQualityDefect = payload === 'ok' ? [] : defectList;

  if (variance !== null) {
    pramsObj.varience = variance;
  }

  pramsList.push(pramsObj);

  return pramsList;
}

// pass button transaction
export function* passQualityTransactionsList(payload: any): Generator<any, void, IQualityData[]> {
  try {
    // when internet is available
    const TransactionsList: IQualityData[] = yield call(createParamsArray, 'ok');

    if (TransactionsList.length > 0) yield call(passQualityTransactionsListFunc, TransactionsList);
  } catch (error) {
    // Handle error if needed
    // ToastPopUp('Error occurred');
  }
}

// update alter or reject transaction list
export function* alterQualityTransactionsList(payload: any): Generator<any, void, IQualityData[]> {
  try {
    const status = yield select((state: RootState) => state.endTableCheck.currentStatus);

    const TransactionsList: IQualityData[] = yield call(createParamsArray, status.toString());
    yield put(resetTempQualityDefect());
    yield put(resetDefect());

    if (TransactionsList.length > 0)
      yield call(alterOrRejectQualityTransactionsListFunc, TransactionsList);
  } catch (error) {
    // Handle error if needed
  }
}

// undo last transaction
export function* undoLastTransaction(payload: any): Generator<any, void, any> {
  try {
    const repaired: boolean = yield select((state: RootState) => state.endTableCheck.repaired);
    const defectEntry: DefectEntry[] = yield checkDefectEntryTableDefectType();
    let isAlterSelect = false;
    let isRejectSelect = false;
    if (defectEntry.length > 0) {
      isAlterSelect = defectEntry[0].defec_type === 'alter';
      isRejectSelect = defectEntry[0].defec_type === 'reject';
    }
    // const isAlterSelect: boolean = yield select(
    //   (state: RootState) => state.defectList.isAlterSelect
    // );
    // const isRejectSelect: boolean = yield select(
    //   (state: RootState) => state.defectList.isRejectSelect
    // );
    const payloadData = payload;
    if (isAlterSelect) {
      payloadData.payload = repaired ? 'repairAlter' : 'alter';
    } else if (isRejectSelect) {
      payloadData.payload = repaired ? 'repairReject' : 'reject';
    } else {
      payloadData.payload = repaired ? 'repairPass' : 'pass';
    }

    if (repaired) {
      if (payloadData.payload === 'pass') {
        payloadData.payload = 'repairPass';
      }
      if (payloadData.payload === 'alter') {
        payloadData.payload = 'repairAlter';
      }
      if (payloadData.payload === 'reject') {
        payloadData.payload = 'repairReject';
      }
    }
    // console.warn(' payloadData.payload', payloadData.payload);
    yield undoLastEndTableDefectItemCount();

    yield call(deleteLastTransaction, payloadData);
  } catch (error) {
    // Handle error if needed
    // ToastPopUp('Error occurred');
  }
}

export function* undoQueryTransaction(payload: any): Generator<any, void, IQualityData[]> {
  try {
    yield call(updateTransactionsListFunc, 'OK');
  } catch (error) {
    // Handle error if needed
    // ToastPopUp('Error occurred');
  }
}

// Function to fetch all buyer records
export function* fetchTransaction(): Generator<any, any, any> {
  try {
    const transaction = yield database.get('transaction').query().fetch();
    return transaction;
  } catch (error) {
    console.error('Error fetching buyers:', error);
    return [];
  }
}

// For Background Task Auto Submit
export function* submitQueryTransaction(payload: any): Generator<any, void, IQualityData[]> {
  try {
    const transaction = yield call(fetchTransaction);

    let data: any[] = [];

    if (transaction.length > 0) {
      const transformedArray = transaction.map((obj: any) => {
        const transformedObj: any = {
          orderEntity: { id: obj.orderEntity },
          workProcess: { id: obj.workProcess },
          organization: { id: obj.organization },
          style: { id: obj.style },
          qualityType: { id: obj.qualityType },
          newQualityDefect: JSON.parse(obj.newQualityDefect),
          sampleSize: obj.sampleSize,
          checkOutput: obj.checkOutput,
          productionTime: obj.productionTime,
          transactionId: obj.transactionId,
          deviceId: obj.deviceId,
          isRepaired: obj.isRepaired
        };

        if (obj.varience !== null) {
          transformedObj.varience = obj.varience;
        }

        return transformedObj;
      });

      data = transformedArray;
    }
    const currentTime = moment().format('YYYY-MM-DDTHH:mm:ss');

    if (data.length > 0) {
      const saveStatus: any = yield call(submitOfflineQueryTransactionFunc, data);
      if (saveStatus === true) {
        // delete Database

        yield call(deleteAllTransaction, currentTime);

        // const missingTransaction = yield call(fetchTransaction);

        // console.log('missingTransaction', missingTransaction);

        // update Offline count
        yield call(updateOfflineCount);
      }
    } else {
      yield put(getGraphDataAction());
      yield put(stopEndTableLoader());
    }
  } catch (error) {
    // Handle error if needed
    // ToastPopUp('Error occurred');
  }
}

const getCurrentStylesApi = async (payload: any): Promise<ColorAndSizeOutput | undefined> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const orgID: string = payload?.orgID !== undefined ? payload.orgID : '';
    const date: string = moment().format('YYYY-MM-DD');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const apiUrl = `${
      BASE_URL + `/api/v1/getColorAndSizeWiseOutput?orgId=${orgID}&inputDate=${date}`
    }`;

    const res = axios
      .get(apiUrl, { headers })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });

    return await res;
  } catch (error) {
    console.error('Error in currentStyles data:', error);
    return undefined; // Or you could return a specific error object here
  }
};

// Function to fetch all  records from db
export function* getReportColorValue(): Generator<any, any, any> {
  try {
    const accessToken = yield select((state: RootState) => state.users.user.data?.accessToken);

    const orgID = yield select((state: RootState) => state.setting.selectedLineID);

    const payload = {
      accessToken,
      orgID
    };

    const response = yield call(getCurrentStylesApi, payload);
    if (response !== undefined) {
      if (response?.data?.content?.finalOutputList?.length > 0) {
        yield put(setReportColorValue(response?.data?.content));
      } else {
        yield put(stopLoaderReportColor());
        ToastPopUp('No data found');
      }
    }
  } catch (error) {
    console.error('Error getReportColorValue:', error);
    return [];
  }
}
