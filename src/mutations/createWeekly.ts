/* eslint-disable */
import { IStoredWeekly } from '@/store/slices/features/medicineDetails/types';
import { BASE_URL } from '@/utils/environment';
import ToastPopUp from '@/utils/Toast.android';
import axios from 'axios';

export const createWeeklyMutation = async (
  accessToken: string | undefined,
  weeklyData: IStoredWeekly[],
  medicineLocalId: string
) => {
  let modifiedData = weeklyData.filter(e => {
    if (e.medicineLocalId.medicineLocalId === medicineLocalId) return e;
  });

  const medicinesInput = JSON.stringify(modifiedData).replace(/"([^"]+)":/g, '$1:'); // Remove quotes from keys

  const mutation = `
    mutation {
       createWeeklyMedicines(
        medicines: ${medicinesInput}
    )
    {
        message
        
      }
    }
    `;

  try {
    const response = await axios.post(
      BASE_URL,
      { query: mutation },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('response', response);

    if (
      response?.data?.data?.createWeeklyMedicines?.message !== undefined &&
      response?.data?.data?.createWeeklyMedicines?.message !== null
    ) {
      //ToastPopUp(response?.data?.data?.createWeeklyMedicines?.message);
    } else if (Array.isArray(response?.data?.errors) && response.data.errors.length > 0) {
      // Show error message from the response
      const errorMessage: any = response?.data?.errors[0]?.message;
      if (typeof errorMessage === 'string') {
        ToastPopUp(errorMessage);
      }
    } else {
      ToastPopUp('Something Went wrong ! please try again later.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
    ToastPopUp('Network Error! Please check your connection.');
  }
};

export const fetchWeeklyMedicines = async (accessToken: string) => {
  // Define the query
  const query = `
    query GetWeeklyMedicinesByUser {
      getWeeklyMedicinesByUser {
        medicineLocalId {
          weeklyTime
          timeInterval
          medicineLocalId
        }
      }
    }
  `;

  try {
    // Make the API request
    const response = await axios.post(
      BASE_URL,
      { query },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Handle the response
    const data = response?.data?.data?.getWeeklyMedicinesByUser;

    if (data) {
      // Return the fetched data
      return data;
    } else if (Array.isArray(response?.data?.errors) && response.data.errors.length > 0) {
      // Handle errors from the API response
      const errorMessage = response?.data?.errors[0]?.message;
      ToastPopUp(errorMessage || 'Error fetching medicines.');
    } else {
      ToastPopUp('Failed to fetch medicines. Please try again.');
    }
  } catch (error) {
    // Handle network or unexpected errors
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
    //ToastPopUp('Network Error! Please check your connection.');
  }

  // Return undefined if something goes wrong
  return undefined;
};
