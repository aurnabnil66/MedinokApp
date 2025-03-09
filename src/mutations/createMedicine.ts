/* eslint-disable */

import { IMedicine } from '@/store/slices/features/medicineDetails/types';
import { BASE_URL } from '@/utils/environment';
import ToastPopUp from '@/utils/Toast.android';
import axios from 'axios';

export const createMedicineData = async (medicines: IMedicine[], accessToken: string) => {
  const buildMutation = `
  mutation {
    createMedicines(medicines: [
      ${medicines
        .map(
          medicine => `{
        medicineLocalId: "${medicine.medicineLocalId}",
        medicineName: "${medicine.medicineName}",
        medicineStatus: "${medicine.medicineStatus}",
        takeStatus: "${medicine.takeStatus}",
        doseQuantity: "${medicine.doseQuantity}",
        doseTime: "${medicine.doseTime}",
        strengthMed: "${medicine.strengthMed}",
        unitMed: "${medicine.unitMed}",
        typeMed: "${medicine.typeMed}",
        createdDate: "${medicine.createdDate}"
        selectedDateTime: "${medicine.selectedDateTime}"
      }`
        )
        .join(',')}
    ]) {
      message
      error {
        message
        code
      }
    }
  }
`;

  try {
    const response = await axios.post(
      BASE_URL,
      { query: buildMutation },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (
      response?.data?.data?.createMedicines?.message !== undefined &&
      response?.data?.data?.createMedicines?.message !== null
    ) {
      // ToastPopUp(response?.data?.data?.createMedicines?.message);
    } else if (Array.isArray(response?.data?.errors) && response.data.errors.length > 0) {
      // Show error message from the response
      const errorMessage: any = response?.data?.errors[0]?.message;
      if (typeof errorMessage === 'string') {
        //ToastPopUp(errorMessage);
      }
    } else {
      ToastPopUp('Something Went wrong ! please try again later.');
    }
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   console.error('Axios Error:', error.message);
    // } else {
    console.error('Unexpected Error:', error);
    // }
    // ToastPopUp('Network Error! Please check your connection.');
  }
};
