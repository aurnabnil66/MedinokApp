import { put } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';

import ToastPopUp from '@/utils/Toast.android';

import { loginAPI } from '../../store/sagas/helper/api.saga';
import { settingSlice } from '../slices/features/settings/slice';
import { usersSlice } from '../slices/features/users/slice';
import { type AccessTokenInfo } from '../types/types';
const { call } = Effects;

interface IGetUserActionPayload {
  payload: {
    mobile: string;
    password: string;
  };
  type: string;
}

export function* loginSaga(
  payload: IGetUserActionPayload
): Generator<any, void, AccessTokenInfo | undefined | any> {
  try {
    const response: any = yield call(loginAPI, payload.payload);

    if (response !== undefined) {
      // yield put(settingSlice.actions.setGlobalLoaderAction({ status: false }));
      // update org tree
      yield put(usersSlice.actions.getUserSuccessAction(response.data));
      yield put(settingSlice.actions.updateFirstTimeQrScreen());
    } else {
      // case undefined
      const data = 'Invalid Mobile Number or Password. Please try again.';
      ToastPopUp(data);
      // yield put(stopLoader());
      yield put(usersSlice.actions.getUserErrorAction('Login failed')); // Handle error case
    }
  } catch (error) {
    console.error(error);
  }
}

export function* loaderChecker(): Generator<any, void, AccessTokenInfo | undefined | any> {
  try {
    // const isLoading = yield select((state: RootState) => state.settings.isLoading);
    // if (isLoading) yield put(stopLoader());
    yield;
  } catch (error) {
    console.error(error);
  }
}
