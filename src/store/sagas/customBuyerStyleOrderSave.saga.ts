/* eslint-disable */

import { call, put, select } from 'redux-saga/effects';
import { deleteBuyer, updateBuyer } from './buyercrud.saga';
import { deleteOrder, updateOrder } from './ordercrud.saga';
import { deleteStyle, updateStyle } from './stylecrud.saga';
import { setLastPullTime, updateGlobalLoader } from '../slices/features/setting/slice';

import { BASE_URL } from '@/utils/environment';
import { RootState } from '..';
import axios from 'axios';
import moment from 'moment';
import { updateVariance } from './variancecrud.saga';

const callBackAPI = async (payload: any): Promise<any | undefined> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const appUrl: string = payload?.apiUrl !== undefined ? payload.apiUrl : '';
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const apiUrl = `${BASE_URL}/${appUrl}`;

    const res = await axios
      .get(apiUrl, { headers })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });

    return res.data;
  } catch (error) {
    console.error('Error in callBackAPI: >>', error);
    return undefined; // Or you could return a specific error object here
  }
};

export function* SyncBuyerData(): Generator<any, void, any> {
  try {
    const accessToken = yield select((state: RootState) => state.users.user.data?.accessToken);

    const currentDateTime = yield select((state: RootState) => state.setting.lastPulledTime);

    const lastPullTimeUrl =
      currentDateTime === ''
        ? 'api/v1/appSync/allDataWithParam'
        : `api/v1/appSync/allDataWithParam?lastPulledTime=${currentDateTime}`;

    let payload = {
      apiUrl: lastPullTimeUrl,
      accessToken: accessToken
    };

    const responseData = yield call(callBackAPI, payload);


    if (responseData !== undefined) {
      yield call(updateBuyerDataSaga, responseData.buyers);
      yield call(updateStyleDataSaga, responseData.styles);
      yield call(updateOrderDataSaga, responseData.orders);
      yield call(updateVarianceDataSaga, responseData.variances);

      const lastPullTime = moment().format('YYYY-MM-DD HH:mm:ss');

      yield put(setLastPullTime(lastPullTime));
    }

    //yield put(updateGlobalLoader(false));
  } catch (error) {
    // Handle errors
    console.error('Error in SyncBuyerData:', error);
  }
}

// update buyer

export function* updateBuyerDataSaga(data: any): Generator<any> {
  try {
    if (data.length > 0) {
      for (const element of data) {
        // delete
        if (element.isDeleted === true) {
          // delete buyer
          yield call(deleteBuyer, element.id);
        } else {
          yield call(updateBuyer, element);
        }
      }
    } else {
      // no data available to update
    }
  } catch (err) {
    console.error('Error in updateBuyerDataSaga:', err);
  }
}

// update style

export function* updateStyleDataSaga(data: any): Generator<any> {
  try {
    if (data.length > 0) {
      for (const element of data) {
        if (element.isDeleted === true) {
          yield call(deleteStyle, element.id);
        } else {
          yield call(updateStyle, element);
        }
      }
    } else {
      // no data available to update
    }
  } catch (err) {
    console.error('Error in updateStyleDataSaga:', err);
  }
}

// update order
export function* updateOrderDataSaga(data: any): Generator<any> {
  try {
    if (data.length > 0) {
      for (const element of data) {
        if (element.isDeleted === true) {
          // create or update
          yield call(deleteOrder, element.id);
        } else {
          // create or update
          yield call(updateOrder, element);
        }
      }
    } else {
      // no data available to update
    }
  } catch (err) {
    console.error('Error in updateOrderDataSaga:', err);
  }
}

// update variance
export function* updateVarianceDataSaga(data: any): Generator<any> {
  try {
    if (data.length > 0) {
      for (const element of data) {
        yield call(updateVariance, element);
      }
    } else {
      // no data available to update
    }
  } catch (err) {
    console.error('Error in updateVarianceDataSaga:', err);
  }
}
