import axios from 'axios';

import {
  type IDataObject,
  type IDefect,
  type IDefectSequence,
  type IOperationBreakDowns
} from '@/models/defect';
import { type IStyles } from '@/models/styles';
import {
  API_VERSION_TWO,
  BASE_URL,
  CURRENT_ORDER_VARIANCE_URL,
  QUALITY_TYPES_URL
} from '@/utils/environment';

const getCurrentStyles = async (payload: any): Promise<IStyles | undefined> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const apiUrl = `${BASE_URL + CURRENT_ORDER_VARIANCE_URL}currentStyles`;

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

const getDefectListWithSequence = async (payload: any): Promise<IDefect | undefined> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const apiUrl = `${BASE_URL + QUALITY_TYPES_URL}appSync/defectListWithSequence`;

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
    console.error('Error in defectListWithSequence data:', error);
    return undefined; // Or you could return a specific error object here
  }
};

const getQmsDefectSequence = async (payload: any): Promise<IDefectSequence | undefined> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const apiUrl = `${BASE_URL + QUALITY_TYPES_URL}leadTimeSettings?type=qms`;

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
    console.error('Error in getQmsDefectSequence data:', error);
    return undefined; // Or you could return a specific error object here
  }
};
const getOperationBreakDowns = async (payload: any): Promise<IOperationBreakDowns | undefined> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const apiUrl = `${BASE_URL + QUALITY_TYPES_URL}appSync/currentOperationBreakDowns`;

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
    console.error('Error in getQmsDefectSequence data:', error);
    return undefined; // Or you could return a specific error object here
  }
};

const getCurrentItemsImages = async (payload: any): Promise<IDataObject | undefined> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const apiUrl = `${BASE_URL + API_VERSION_TWO}currentItemsImages`;

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
    console.error('Error in getCurrentItemsImages data:', error);
    return undefined; // Or you could return a specific error object here
  }
};

export {
  getCurrentItemsImages,
  getCurrentStyles,
  getDefectListWithSequence,
  getOperationBreakDowns,
  getQmsDefectSequence
};
