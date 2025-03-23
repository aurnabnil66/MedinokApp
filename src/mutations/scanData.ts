import {QR_CODE_URL} from '../utils/environment';
import axios from 'axios';

interface IMedicineScanData {
  id: number;
  manufacturer: string;
  brandName: string;
  dosageFromStrength: string;
  indication: string;
  sideEffects: string;
  dose: string;
  contraindication: string;
}

// Interface for the response data
interface GetMedicinesResponse {
  data: {
    getMedicineData: IMedicineScanData;
  };
}

export const fetchScannedMedicines = async (
  id: number,
): Promise<IMedicineScanData | null> => {
  const query = `
    mutation GetMedicineData($id: Float!) {
      getMedicineData(id: $id) {
        id
        manufacturer
        brandName
        dosageFromStrength
        indication
        sideEffects
        dose
        contraindication
      }
    }
  `;

  try {
    const response: GetMedicinesResponse = await axios.post(QR_CODE_URL, {
      query: query,
      variables: {id},
    });

    console.log('Response: ', response);

    return response?.data?.getMedicineData || null;
  } catch (error) {
    console.error('Error fetching scanned medicine data:', error);
    return null;
  }
};
