import axios from 'axios';
import * as Effects from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import {
  type IApiProductionData,
  type IProductionItem,
  type XendTableGraphData,
  type XYDataPoint
} from '@/models/endTableCheck';
import { BASE_URL } from '@/utils/environment';

import { getTodaysHourWiseProductionBarSlice } from '../slices/features/getTodaysHourWiseProductionBar/slice';
import { type RootState } from '..';
const { call } = Effects;

const callBackAPI = async (payload: any): Promise<IApiProductionData | undefined> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const orgID: string = payload?.selectedLineID !== '' ? payload?.selectedLineID : '';
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const apiUrl = `${BASE_URL}/api/v1/productions/getTodaysHourWiseProductionBar?orgId=${orgID}`;

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
    console.error('Error in callBackAPI:', error);
    return undefined; // Or you could return a specific error object here
  }
};

const customGraphData = (obj: IApiProductionData): XendTableGraphData => {
  const endTableGraphData: XendTableGraphData = {
    previousAvg: 0,
    previousDayProduction: [],
    previousMax: 0,
    previousMin: 0,
    todayProduction: [],
    todaysAvg: 0,
    todaysMax: 0,
    todaysMin: 0
  };

  if (obj.content.production.length > 0) {
    obj.content.production.forEach((productionItem: IProductionItem) => {
      const beforeHyphenHour = productionItem.hour.split('-')[0];
      const objDataPreviousDay: XYDataPoint = {
        x: parseInt(beforeHyphenHour),
        y: 0
      };
      const objDataToDay: XYDataPoint = {
        x: parseInt(beforeHyphenHour),
        y: 0
      };

      objDataToDay.y = productionItem.todayProduction;
      objDataPreviousDay.y = productionItem.previousDayProduction;

      endTableGraphData.previousDayProduction.push(objDataPreviousDay);
      endTableGraphData.todayProduction.push(objDataToDay);
    });
  }

  endTableGraphData.previousAvg = obj.content.previousAvg;
  endTableGraphData.previousMax = obj.content.previousMax;
  endTableGraphData.previousMin = obj.content.previousMin;
  endTableGraphData.todaysAvg = obj.content.todaysAvg;
  endTableGraphData.todaysMax = obj.content.todaysMax;
  endTableGraphData.todaysMin = obj.content.todaysMin;

  if (endTableGraphData.previousDayProduction.length === 1) {
    const demoPreviousDay =
      endTableGraphData.previousDayProduction[0].x === 0
        ? 0
        : endTableGraphData.previousDayProduction[0].x + 1;

    const demoPresentDay =
      endTableGraphData.todayProduction[0].x === 0 ? 0 : endTableGraphData.todayProduction[0].x + 1;

    const DamePreviousValue = {
      x: demoPreviousDay,
      y: endTableGraphData.previousDayProduction[0].y
    };

    const DamePresentValue = {
      x: demoPresentDay,
      y: endTableGraphData.todayProduction[0].y
    };

    endTableGraphData.previousDayProduction.push(DamePreviousValue);
    endTableGraphData.todayProduction.push(DamePresentValue);
  }

  return endTableGraphData;
};

export function* getGraphData(payload: any): Generator<any, void, IApiProductionData | undefined> {
  try {
    const accessToken = yield Effects.select(
      (state: RootState) => state.users.user.data?.accessToken
    );

    const selectedLineID = yield Effects.select((state: RootState) => state.setting.selectedLineID);

    const payloadIs = {
      selectedLineID,
      accessToken
    };
    const response: IApiProductionData | undefined = yield call(callBackAPI, payloadIs);
    if (response !== undefined) {
      const loadedGraphData: XendTableGraphData = customGraphData(response);
      // Use loadedGraphData as needed
      if (loadedGraphData !== null)
        yield put(getTodaysHourWiseProductionBarSlice.actions.setGraphDataAction(loadedGraphData));
    } else {
      // Handle the case where response is undefined
      console.warn('Response is undefined');
    }
  } catch (error) {
    console.error('Error in getGraphData:', error);
    // Handle error if needed
    // ToastPopUp('Error occurred');
  }
}
