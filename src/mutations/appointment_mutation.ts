/* eslint-disable */

import { BASE_URL } from '@/utils/environment';
import ToastPopUp from '@/utils/Toast.android';
import axios from 'axios';

export const APPOINTMENT_MUTATION = async (medicineDetailsId: string, appointmentData: any) => {
  const mutation = `
    mutation{
      appointment(
          appointmentInput : {
          date : "${appointmentData.date}",
          doctorName: "${appointmentData.doctorName}",
          setReminder: "${appointmentData.setReminder}",
          location: "${appointmentData.location}",
          time : "${appointmentData.time}",
        }
      ){
        message,
      }
    }
  `;

  try {
    const response = await axios.post(
      BASE_URL,
      {
        query: mutation,
        variables: {
          medicineDetailsExtraId: medicineDetailsId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${appointmentData.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (
      response?.data?.data?.appointment?.message !== undefined &&
      response.data.data.appointment.message !== null
    ) {
      ToastPopUp(response.data.data.appointment.message);
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
