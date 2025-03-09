import { InstrucTion } from '@/store/slices/features/medicineDetailsExtraSetting/types';
import { BASE_URL } from '@/utils/environment';
import ToastPopUp from '@/utils/Toast.android';
import axios from 'axios';

export const INSTRUCTION_MUTATION = async (
  instructions: InstrucTion[],
  medicineLocalId: string,
  accessToken: string
) => {
  const buildMutation = `
        mutation {
    createInstructionMedicines(medicines: [
      ${instructions
        .map(
          instruction => `{
        medicineLocalId: "${instruction.medicineLocalId}",
        instrucTion: "${instruction.instrucTion}",
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
      response?.data?.data?.createInstructionMedicines?.message !== undefined &&
      response.data.data.createInstructionMedicines.message !== null
    ) {
      ToastPopUp(response.data.data.createInstructionMedicines.message);
    } else if (Array.isArray(response?.data?.errors) && response.data.errors.length > 0) {
      // Show error message from the response
      const errorMessage: any = response?.data?.errors[0]?.message;
      if (typeof errorMessage === 'string') {
        //jwt error need to be fixed
        // ToastPopUp(errorMessage);
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
    ToastPopUp('Network Error! Please check your connection.');
  }
};
