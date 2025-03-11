import React, {useState, type FC} from 'react';
import type {SubmitHandler} from 'react-hook-form';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {fetchMonthlyMedicines} from '../../mutations/createMonthly';
import {fetchMedicines} from '../../mutations/medicine';
import {RootState} from '../../store';
import {
  setDoseList,
  setMonthlyStoreData,
} from '../../store/slices/features/medicineDetails/slice';
import useNetworkStatus from '../../utils/networkUtills';
import ToastPopUp from '../../utils/Toast.android';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import Header from '../../Components/Header/Header';
import {getUserSuccessAction} from '../../store/slices/features/users/slice';
import {colors} from '../../theme/colors';
import {BASE_URL} from '../../utils/environment';
import {mobileSignInFormValidation} from '../../utils/formValidation';
import styles from './style';

interface ISignInFormDataProps {
  mobile: string;
  password: string;
}

const Login: FC = () => {
  // yup validation with react-hook-form
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ISignInFormDataProps>({
    resolver: yupResolver(mobileSignInFormValidation),
    defaultValues: {
      mobile: '',
      password: '',
    },
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {isInternetReachable, isCellularConnection} = useNetworkStatus();

  const loading = useSelector((state: RootState) => state.users.user.isLoading);
  const appLoadFirstTime = useSelector(
    (state: RootState) => state.settings.appLoadFirstTime,
  );
  const appStatus = useSelector((state: RootState) => state.settings.appStatus);

  const [disable, setDisable] = useState(false);

  // Request Android notification permission
  const requestAndroidNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.warn('Notification permission denied');
          Alert.alert(
            'Permission required',
            'Please enable notifications in settings.',
          );
        }
      } catch (err) {
        console.error('Permission request error:', err);
      }
    }
  };

  requestAndroidNotificationPermission();

  // SignIn handler
  const handleSignIn: SubmitHandler<ISignInFormDataProps> = async formData => {
    setDisable(true);
    try {
      if (!isInternetReachable && !isCellularConnection) {
        ToastPopUp('Please Check Internet Connection!..');
      } else {
        const response: any = await axios.post(BASE_URL, {
          query: `
            mutation login($mobileNumber: String!, $password: String!) {
                login(mobileNumber: $mobileNumber, password: $password) {
                  accessToken
                  user {
                    fullName
                    birthday
                    email
                    mobileNumber
                    gender
                }
              }
            }
          `,
          variables: {
            mobileNumber: formData.mobile,
            password: formData.password,
          },
        });

        // check if login is successful
        if (response?.data?.data?.login?.accessToken !== undefined) {
          ToastPopUp('Login successfully.');
          setDisable(false);

          const res = response.data.data.login;

          const medicine = await fetchMedicines(
            response?.data?.data?.login?.accessToken,
          );

          if (medicine.length > 0) dispatch(setDoseList(medicine));
          const fetchMonthlyData = await fetchMonthlyMedicines(
            response?.data?.data?.login?.accessToken,
          );

          if (fetchMonthlyData !== undefined)
            dispatch(setMonthlyStoreData(fetchMonthlyData));

          dispatch(getUserSuccessAction(res));
        } else if (
          Array.isArray(response?.data?.errors) &&
          response.data.errors.length > 0
        ) {
          // Show error message from the response
          const errorMessage: any = response?.data?.errors[0]?.message;
          if (typeof errorMessage === 'string') {
            ToastPopUp('Invalid Mobile Number or Password');
            setDisable(false);
          }
        } else {
          ToastPopUp('Something Went wrong ! please try again later.');
        }
      }
    } catch (err) {
      console.error('error', err);
    } finally {
      setDisable(false);
    }
  };

  // Navigation handlers
  const handleGuestLogin: any = () => {
    // if (appLoadFirstTime) {
    //   navigation.navigate('MedicineDoses' as never);
    // } else {
    //   if (appStatus === 'initial') {
    //     dispatch(updateAppStatus());
    //     navigation.navigate('MedicineDoses' as never);
    //   } else {
    //     navigation.navigate('ScanQrCodeScreenNew' as never);
    //   }
    // }
    navigation.navigate('MedicineAddingMethod' as never);
  };
  const handleCreateAccount: any = () => {
    navigation.navigate('CreateAccount' as never);
  };
  // const handleForgotPassword: any = () => {
  //   navigation.navigate('ForgotPassword' as never);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
        <Header mainHeader="Log In" />
      </View>
      <View style={styles.subHeaderFirstLine}>
        <Header subHeader="Log in to access your personalized" />
      </View>
      <View style={styles.subHeaderSecondLine}>
        <Header subHeader="Medinest experience" />
      </View>

      <Spinner visible={loading} textContent={'Loading...'} />

      <View style={styles.textInputComponentsPosition}>
        {/* Mobile Number Input */}
        <View style={styles.mobileNumberInput}>
          <Text style={styles.inputHeader}>Mobile Number</Text>
          <Controller
            control={control}
            name="mobile"
            render={({field: {onChange, value}}) => (
              <CustomTextInput
                type="mobile"
                value={value}
                onChangeText={onChange}
                placeholder="Enter your mobile number..."
                inputStyle={styles.inputText}
                isError={Boolean(errors.mobile)} // Pass isError prop
                leftIcon={
                  <Feather name="smartphone" size={25} color="#888888" />
                }
              />
            )}
          />
          {errors.mobile != null && (
            <Text style={styles.errorTxt}>{errors.mobile.message}</Text>
          )}
        </View>

        {/* Password Input */}
        <View style={styles.passwordInput}>
          <Text style={styles.inputHeader}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <CustomTextInput
                type="password"
                value={value}
                onChangeText={onChange}
                placeholder="Enter your password..."
                inputStyle={styles.inputText}
                isPassword
                isError={Boolean(errors.password)}
                leftIcon={
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={25}
                    color="#888888"
                  />
                }
              />
            )}
          />
          {errors.password != null && (
            <Text style={styles.errorTxt}>{errors.password.message}</Text>
          )}
        </View>
      </View>

      {/* Sign In Button */}
      <View style={styles.signInButtonPosition}>
        <CustomButton
          onPress={() => {
            void handleSubmit(handleSignIn)();
          }}
          disabled={disable}
          icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
          text="Sign In"
        />
      </View>

      {/* Or Separator */}
      <View style={styles.orPartPosition}>
        <View style={styles.orPart}>
          <View style={styles.orHorizontalLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.orHorizontalLine} />
        </View>
      </View>

      {/* Guest Login Button */}
      <View style={styles.guestButtonPosition}>
        <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
          <Feather name="user" size={30} color="#888888" />
          <Text style={styles.guestButtonText}>Continue as guest</Text>
        </TouchableOpacity>
      </View>

      {/* Create Account & Forgot Password Links */}
      <View style={styles.askAboutAccount}>
        <Text style={styles.askAboutAccountText}>
          Don’t have an account?{'  '}
        </Text>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.signUpText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Login;
