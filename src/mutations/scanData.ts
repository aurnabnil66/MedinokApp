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

  console.log(`Attempting to fetch medicine with ID: ${id}`);

  try {
    const response = await axios.post(
      QR_CODE_URL,
      {
        query: query,
        variables: {id: parseFloat(id.toString())},
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    // Log the raw response to see the exact structure
    console.log('Raw response:', JSON.stringify(response.data, null, 2));

    // Check if there are GraphQL errors
    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      return null;
    }

    // Check the correct path for data
    if (!response.data.data?.getMedicineData) {
      console.error('No medicine data in response:', response.data);
      return null;
    }

    return response.data.data.getMedicineData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Network error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
    } else {
      console.error('Error fetching scanned medicine data:', error);
    }
    return null;
  }
};
