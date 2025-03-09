import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { BASE_URL, QUALITY_TYPES_URL } from '@/utils/environment';

import { setQCLunchData } from '../slices/features/setting/slice';

interface WorkProcess {
  id: number;
  name: string;
}

export interface QCLunchItem {
  id: number;
  name: string;
  workProcess: WorkProcess;
  isOperationWise: number;
  sampleSize: number;
  type: number;
}

const callBackAPI = async (payload: any): Promise<undefined | any> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const apiUrl = payload?.url !== undefined ? payload?.url : '';

    const res = await axios
      .get(apiUrl, { headers })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
    return res?.data.content;
  } catch (error) {
    console.error('Error in callBackAPI:', error);
    return undefined; // Or you could return a specific error object here
  }
};

export function* offlineQCData(payload: any): Generator<any, void, any> {
  try {
    const { accessToken } = payload;

    const url = BASE_URL + QUALITY_TYPES_URL + 'qualityTypes';

    const payloadCustomerIs = {
      accessToken,
      url
    };

    const responseData = yield call(callBackAPI, payloadCustomerIs);

    if (responseData !== undefined) {
      yield put(setQCLunchData(responseData));
    }
  } catch (error) {
    // Handle error if needed
    // ToastPopUp('Error occurred');
  }
}
