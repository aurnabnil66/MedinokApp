// // // updated and check
// import axios from 'axios';
// import { call, put, select } from 'redux-saga/effects';

// import { BASE_URL } from '@/utils/environment';

// import { getLunchTime, updateSyncData, updateSyncFailed } from '../slices/features/setting/slice';
// import { type RootState } from '..';

// import { SyncBuyerData } from './customBuyerStyleOrderSave.saga';
// // import { SyncBuyerData } from './customBuyerStyleOrderSave.saga';
// import { offlineQCData } from './offline.qcLunchData';

// // api call
// const callBackAPI = async (payload: any): Promise<any> => {
//   try {
//     const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
//     const headers = {
//       Authorization: `Bearer ${token}`
//     };

//     const apiUrl = payload?.url !== undefined ? payload?.url : '';

//     const res = axios
//       .get(apiUrl, { headers })
//       .then(response => {
//         return response.data;
//       })
//       .catch(error => {
//         throw error;
//       });

//     return await res;
//   } catch (error) {
//     console.error('Error in callBackAPI:', error);
//     return undefined; // Or you could return a specific error object here
//   }
// };

// export const call_Back_API = async (payload: any): Promise<undefined | any> => {
//   try {
//     const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
//     const headers = {
//       Authorization: `Bearer ${token}`
//     };

//     const apiUrl = payload?.url !== undefined ? payload?.url : '';

//     const res = await axios
//       .get(apiUrl, { headers })
//       .then(response => {
//         return response.data;
//       })
//       .catch(error => {
//         throw error;
//       });
//     return [res?.data?.content[0]?.isColorSizeRequired, res?.data?.content[0]?.logicPlanRequired];
//   } catch (error) {
//     return undefined; // Or you could return a specific error object here
//   }
// };

// export function* syncProcessNow(): Generator<any, void, any> {
//   try {
//     const accessToken = yield select((state: RootState) => state.users.user.data?.accessToken);
//     const selectedLineID = yield select((state: RootState) => state.setting.selectedLineID);

//     const payloadIs = {
//       accessToken,
//       url: `${BASE_URL}/api/org:loggedUserOrgtree`
//     };

//     const responseOrgTree = yield call(callBackAPI, payloadIs);

//     // get OrganizationTree Update
//     if (responseOrgTree !== undefined) {
//       yield put(updateSyncData(responseOrgTree?.data));
//     }

//     // moth variance
//     const accessTokens = yield select((state: RootState) => state.users.user.data?.accessToken);

//     const apiUrl = BASE_URL + '/' + 'api/v1/leadTimeSettings';
//     const params = {
//       url: apiUrl,
//       accessToken: accessTokens
//     };

//     const apiResult = yield call(call_Back_API, params);

//     if (apiResult !== undefined) {
//       yield call(SyncBuyerData, apiResult[1]);
//     }

//     // update buyer style order variance table new code
//     // yield call(SyncBuyerData);

//     // lunch Time update
//     if (selectedLineID !== undefined && selectedLineID !== '') {
//       yield put(getLunchTime(selectedLineID));
//     }

//     // updated qc lunch pad
//     payloadIs.url = `${BASE_URL}/api/org:loggedUserOrgtree`;
//     yield call(offlineQCData, payloadIs);
//     // all defect

//     // stop loader
//     // yield put(updateGlobalLoader(false));
//   } catch (error) {
//     // failed update
//     yield put(updateSyncFailed());
//   }
// }
