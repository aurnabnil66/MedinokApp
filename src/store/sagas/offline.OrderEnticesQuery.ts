import axios from 'axios';
import * as Effects from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import { type IOrderEnticesTypes, type OrderEntity } from '@/models/orderEnticesTypes';
import { BASE_URL } from '@/utils/environment';

import { setOrderEnticesQuery } from '../slices/features/setting/slice';
import { type RootState } from '..';
const { call } = Effects;

const callBackAPI = async (payload: any): Promise<IOrderEnticesTypes | undefined> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const apiUrl = `${BASE_URL}/api/v1/appSync/orderEntities?type=mobile`;

    const res = await axios
      .get(apiUrl, { headers })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });

    return res?.content?.orderEntities;
  } catch (error) {
    console.error('Error in callBackAPI:', error);
    return undefined; // Or you could return a specific error object here
  }
};

export function* offlineOrderEnticesQuery(
  payload: any
): Generator<any, void, OrderEntity[] | undefined> {
  try {
    const accessToken = yield Effects.select(
      (state: RootState) => state.users.user.data?.accessToken
    );
    const payloadIs = {
      payload,
      accessToken
    };
    const responseData = yield call(callBackAPI, payloadIs);

    if (responseData !== undefined) {
      yield put(setOrderEnticesQuery(responseData));
    } else {
      // error no data
      yield put(setOrderEnticesQuery([]));
    }
  } catch (error) {
    // Handle error if needed
    // ToastPopUp('Error occurred');
  }
}
