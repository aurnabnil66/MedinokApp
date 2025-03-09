import { IMedicineReminder } from '@/store/slices/features/medicineDetailsExtraSetting/types';
import { BASE_URL } from '@/utils/environment';
import ToastPopUp from '@/utils/Toast.android';
import axios from 'axios';

export const MEDICINE_REMINDER_MUTATION = async (
  reminders: IMedicineReminder[],
  medicineLocalId: string,
  accessToken: string
) => {
  const buildMutation = `
        mutation {
    createReminderMedicines(medicines: [
      ${reminders
        .map(
          reminder => `{
        medicineReminderCurrentStock: "${reminder.medicineReminderCurrentStock}",
        medicineReminderRemindToLeft: "${reminder.medicineReminderRemindToLeft}",
        medicineReminderTotalReq: "${reminder.medicineReminderTotalReq}",
      }`
        )
        .join(',')}
    ]) {
      message
    }
  }
    `;

  try {
    const response = await axios.post(
      BASE_URL,
      {
        query: buildMutation,
        variables: {
          medicineDetailsExtraId: medicineLocalId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (
      response?.data?.data?.createReminderMedicines?.message !== undefined &&
      response.data.data.createReminderMedicines.message !== null
    ) {
      ToastPopUp(response.data.data.createReminderMedicines.message);
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
    // if (axios.isAxiosError(error)) {
    //   console.error('Axios Error:', error.message);
    // } else {
    console.error('Unexpected Error:', error);
    // }
    // need to check and fix for the error we get
    // ToastPopUp('Network Error! Please check your connection.');
  }
};
