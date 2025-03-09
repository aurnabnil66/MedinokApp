import axios from 'axios';
import { call, put, select } from 'redux-saga/effects';

import { BASE_URL } from '@/utils/environment';

import { setVarianceSetting } from '../slices/features/setting/slice';
import { type RootState } from '..';

export const callBackAPI = async (payload: any): Promise<undefined | any> => {
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
    return [res?.data?.content[0]?.isColorSizeRequired, res?.data?.content[0]?.logicPlanRequired];
  } catch (error) {
    return undefined; // Or you could return a specific error object here
  }
};

// get variance
export function* getVariance(payload: any): Generator<any, any | undefined, any> {
  try {
    const accessTokens = yield select((state: RootState) => state.users.user.data?.accessToken);

    const apiUrl = BASE_URL + '/' + 'api/v1/leadTimeSettings';
    const params = {
      url: apiUrl,
      accessToken: accessTokens === undefined ? payload : accessTokens
    };

    const apiResult = yield call(callBackAPI, params);

    if (apiResult !== undefined) {
      yield put(setVarianceSetting(apiResult));
    }
  } catch (err) {
    console.error('Error in callBackAPI:', err);
    return undefined;
  }
}
