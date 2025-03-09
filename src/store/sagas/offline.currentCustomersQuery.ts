import axios from 'axios';
import * as Effects from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import { BASE_URL } from '@/utils/environment';

import { setOfflineCurrentCustomersQuery } from '../slices/features/setLineStyle/slice';
import { type Customer } from '../slices/features/setLineStyle/types';
import { setOrderEnticesQuery } from '../slices/features/setting/slice';
import { type RootState } from '..';
const { call } = Effects;

const callBackAPI = async (payload: any): Promise<Customer[] | undefined> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const apiUrl = `${BASE_URL}/api/v1/appSync/currentCustomers`;

    const res = await axios
      .get(apiUrl, { headers })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });

    return res?.content?.customers;
  } catch (error) {
    console.error('Error in callBackAPI:', error);
    return undefined; // Or you could return a specific error object here
  }
};

export function* offlineCurrentCustomersQuery(
  payload: any
): Generator<any, void, Customer[] | undefined> {
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
      yield put(
        setOfflineCurrentCustomersQuery({
          payload: responseData
        })
      );
    } else {
      // error no data
      yield put(setOrderEnticesQuery([]));
    }
  } catch (error) {
    // Handle error if needed
    // ToastPopUp('Error occurred');
  }
}
