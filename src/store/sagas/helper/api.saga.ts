import axios from 'axios';

import { type LoginResponse } from '@/store/types/types';
import { BASE_URL} from '@/utils/environment';
import ToastPopUp from '@/utils/Toast.android';
const apiUrl = BASE_URL;

interface IPayload {
  mobile: string;
  password: string;
}

interface ICommonGetAPIProps {
  url: string;
  token: string;
}

// interface ICommonPostAPIProps {
//   url: string;
//   token: string;
// }

export const loginAPI = async (payload: IPayload): Promise<LoginResponse | undefined> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestData = {
      email: payload.mobile,
      password: payload.password
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(apiUrl, requestData, config);
    return response.data;
  } catch (error) {
    console.error('Error in loginAPI:', error);
    ToastPopUp('Sign In Failed. ');
    return undefined; // Or you could return a specific error object here
  }
};

export const commonGetAPI = async (props: ICommonGetAPIProps): Promise<any> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.token);

    // console.log('props props', props);

    const requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
      body: null, // No need for body in a GET request
      redirect: 'follow'
    };

    const response = await fetch(props.url, requestOptions).then(async response => {
      if (response.status === 200 || response.status === 201) {
        return await response.json();
      } else {
        console.error(`Request failed with status: ${response.status}`);
        return undefined; // Return undefined if status is not 200 or 201
      }
    });
    //   .then(result => {
    //     if (result) {
    //       console.log(result);
    //       // Process your result here
    //       return result;
    //     } else {
    //       return []; // Return an empty array if the response was not successful
    //     }
    //   });
    //   .catch(error => {
    //     return undefined;
    //   });

    return response;
  } catch (error) {
    ToastPopUp('Something went wrong. Please try again later. ');
    console.error('Error in commonGetAPI:', error);
    return undefined; // Or you could return a specific error object here
  }
};

// export const commonPostAPI = async (props: ICommonPostAPIProps): Promise<any> => {
//   try {
//     console.log('props', props);
//     let data = JSON.stringify(props.data);

//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: props.url,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + props.token
//       },
//       data: data
//     };

//     return axios
//       .request(config)
//       .then((response: any) => {
//         return response.data;
//       })
//       .catch((err: any) => {
//         console.log('err', err);
//         ToastPopUp('Something went wrong. Please try again later. ');
//         return undefined;
//       });
//   } catch (error) {
//     ToastPopUp('Something went wrong. Please try again later. ');
//     console.error('Error in commonGetAPI:', error);
//     return undefined; // Or you could return a specific error object here
//   }
// };

// export const commonPutAPI = async (props: ICommonPostAPIProps) => {
//   try {
//     let data = JSON.stringify(props.data);

//     let config = {
//       method: 'put',
//       maxBodyLength: Infinity,
//       url: props.url,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + props.token
//       },
//       data: data
//     };

//     return axios
//       .request(config)
//       .then(response => {
//         // console.log(JSON.stringify(response.data));
//         return response.data;
//       })
//       .catch(error => {
//         console.log(error);
//         ToastPopUp('Something went wrong. Please try again later. ');
//         return undefined;
//       });
//   } catch (err) {
//     ToastPopUp('Something went wrong. Please try again later. ');
//     console.error('error');
//     return undefined;
//   }
// };
