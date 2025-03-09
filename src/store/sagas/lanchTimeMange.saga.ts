import axios from 'axios';
import moment from 'moment';
import { call, put, select } from 'redux-saga/effects';

import { BASE_URL } from '@/utils/environment';
import ToastPopUp from '@/utils/Toast.android';

import { setLunchTime } from '../slices/features/setting/slice';
import { type RootState } from '..';

import { checkInternetConnection } from './qualityTransactionsList.saga';

interface LineLunchInfoObject {
  timestamp: number;
  status: string;
  statusCode: number;
  message: string;
  totalCount: number;
  numberOfElements: number;
  content: Content[];
}
interface Content {
  id: number;
  productiontarget: number;
  numberOfOperator: number;
  numberOfHelper: number;
  manPower: number;
  date: number;
  dateString: string;
  workingHr: number;
  ironerMan: number;
  floaterMan: number;
  organization: Organization;
  parentOrgName: string;
  lineStartTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
}
interface Organization {
  id: number;
  name: string;
  parentId: number;
}

const currentDate = moment().format('YYYY-MM-DD');
const callBackAPI = async (payload: any): Promise<LineLunchInfoObject | undefined> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';

    const selectedLineID: string =
      payload?.selectedLineID !== undefined ? payload.selectedLineID : '';
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const apiUrl = `${BASE_URL}/api/v1/targetAndManpower/getTargetAndManpowerByStartDateAndEndDate?orgId=${selectedLineID}&startDate=${currentDate}&endDate=${currentDate}`;

    const res = await axios
      .get(apiUrl, { headers })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });

    if (res.data.content.length === 0) {
      return undefined;
    }

    return res;
  } catch (error) {
    console.error('Error in callBackAPI:', error);
    return undefined; // Or you could return a specific error object here
  }
};

// check Loader
export function* syncLunchTimeNow(): Generator<any, void, any> {
  try {
    const accessToken = yield select((state: RootState) => state.users.user.data?.accessToken);
    const selectedLineID = yield select((state: RootState) => state.setting.selectedLineID);

    const payloadIs = {
      selectedLineID,
      accessToken
    };

    const isConnected: boolean = yield call(checkInternetConnection);

    if (isConnected) {
      const response: LineLunchInfoObject | undefined | any = yield call(callBackAPI, payloadIs);

      // console.log('lunch time', response);

      const resData = {
        parentOrgName:
          response?.data?.content[0].parentOrgName !== undefined
            ? response?.data.content[0].parentOrgName
            : '',
        lineStartTime:
          response?.data.content[0].lineStartTime !== undefined
            ? response?.data.content[0].lineStartTime
            : '',
        lunchStartTime:
          response?.data.content[0].lunchStartTime !== undefined
            ? response?.data.content[0].lunchStartTime
            : '',
        lunchEndTime:
          response?.data.content[0].lunchEndTime !== undefined
            ? response?.data.content[0].lunchEndTime
            : '',
        currentLunchTimeDate: currentDate
      };

      let data = '';

      if (response !== undefined) {
        data = 'Lunch Time Updated.';
        ToastPopUp(data);
        yield put(setLunchTime(resData));
      } else {
        // no lunch time
        data = 'No Lunch Time Found.';
        ToastPopUp(data);
      }
    }
  } catch (error) {
    // failed update
    // yield put(updateSyncFailed());
  }
}
