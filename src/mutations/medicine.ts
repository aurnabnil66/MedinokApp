/* eslint-disable */

import { BASE_URL } from '@/utils/environment';
import axios from 'axios';

interface Medicine {
  medicineName: string;
  medicineStatus: string;
  takeStatus: string;
  doseTime: string;
  doseQuantity: string;
  strengthMed: string; // Consider changing this to a number if applicable
  unitMed: string;
  typeMed: string;
  createdDate: string;
  medicineLocalId: string;
  selectedDateTime: Date | null;
}

// Interface for the response data
interface GetMedicinesByUserResponse {
  data: {
    data: any;
    getMedicinesByUser: Medicine[];
  };
}

export const fetchMedicines = async (token: string): Promise<Medicine[]> => {
  const query = `
      query {
        getMedicinesByUser {
          medicineName
          medicineStatus
          takeStatus
          doseTime
          doseQuantity
          strengthMed
          unitMed
          typeMed
          createdDate
          medicineLocalId
          selectedDateTime
        }
      }
    `;

  try {
    const response: GetMedicinesByUserResponse = await axios.post(
      BASE_URL,
      { query: query },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Check if the response contains data
    return response?.data?.data?.getMedicinesByUser || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
    return []; // Return an empty array on error
  }
};
