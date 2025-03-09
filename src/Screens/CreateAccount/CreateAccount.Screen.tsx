/* eslint-disable */

import React, { type FC, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from '../../utils/environment';
import ToastPopUp from '@/utils/Toast.android';
import RNPickerSelect from 'react-native-picker-select';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import Header from '../../Components/Header/Header';
import { colors } from '../../theme/colors';

import styles from './style';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAccountFormValidation } from '../../utils/formValidation';
import DatePicker from 'react-native-date-picker';

const CreateAccount: FC = () => {
  const navigation = useNavigation();
  const [fullName] = useState<string>('');
  const [mobile] = useState<string>('');
  const [email] = useState<string>('');
  const [gender] = useState<string>('');
  const [birthday] = useState<string>('');
  const [password] = useState<string>('');

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');

  const [disable, setDisable] = useState(false);

  // interface for creat account
  interface ICreateAccountDataProps {
    fullName: string;
    mobile: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    birthDate: string;
  }

  // yup validation with react-hook-form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ICreateAccountDataProps>({
    resolver: yupResolver(createAccountFormValidation),
    defaultValues: {
      fullName: '',
      mobile: '',
      email: '',
      password: '',
      gender: '',
      birthDate: '',
      confirmPassword: ''
    }
  });

  const handleSelectDate: any = () => {
    setModalVisible(true);
  };

  const handleConfirmDate = (date: Date) => {
    setModalVisible(false);
    setDate(date);

    // Format the date as needed
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    };
    const dateStr = new Intl.DateTimeFormat('en-US', options).format(date);

    // Update selected date and form field
    setSelectedDate(dateStr);
    setValue('birthDate', dateStr); // Update birthDate in the form
  };

  const handleSignUp = async (data: ICreateAccountDataProps): Promise<void> => {
    setDisable(true);
    const registerInput = {
      fullName: data.fullName,
      mobileNumber: data.mobile,
      email: data.email,
      gender: data.gender,
      birthday: data.birthDate,
      password: data.password
    };

    try {
      const response: any = await axios.post(BASE_URL, {
        query: `
          mutation {
            register(registerInput: {
              fullName: "${registerInput.fullName}",
              mobileNumber: "${registerInput.mobileNumber}",
              password: "${registerInput.password}",
              email: "${registerInput.email}",
              gender: "${registerInput.gender}",
              birthday: "${registerInput.birthday}"
            }) {
              message
            }
          }
        `
      });

      if (response?.data?.data?.register?.message) {
        ToastPopUp(response.data.data.register.message);
        setDisable(false);
        navigation.navigate('Login' as never);
      } else if (Array.isArray(response?.data?.errors) && response.data.errors.length > 0) {
        const errorMessage: any = response.data.errors[0].message;
        ToastPopUp(typeof errorMessage === 'string' ? errorMessage : 'Error occurred');
        setDisable(false);
      } else {
        ToastPopUp('Something went wrong! Please try again later.');
      }
    } catch (err) {
      console.error('Error in registration:', err);
    } finally {
      setDisable(false);
    }
  };

  const handleSignIn: any = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.headingPosition}>
        <Header mainHeader="New Account" />
      </View> */}
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.textInputComponentPosition}>
          <View style={styles.textInputComponentProperties}>
            <Text style={styles.inputHeader}>Full Name</Text>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  type="email"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your full name..."
                  inputStyle={styles.inputText}
                  isError={Boolean(errors.fullName)}
                  leftIcon={<AntDesign name="user" size={25} color={'#888888'} />} // Left icon
                />
              )}
            />
            {errors.fullName != null && (
              <Text style={styles.errorTxt}>{errors.fullName.message}</Text>
            )}
          </View>

          <View style={styles.textInputComponentProperties}>
            <Text style={styles.inputHeader}>Mobile Number</Text>
            <Controller
              control={control}
              name="mobile"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  type="mobile"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your mobile number..."
                  inputStyle={styles.inputText}
                  isError={Boolean(errors.mobile)}
                  leftIcon={<Feather name="smartphone" size={25} color={'#888888'} />}
                />
              )}
            />
            {errors.mobile != null && <Text style={styles.errorTxt}>{errors.mobile.message}</Text>}
          </View>

          <View style={styles.textInputComponentProperties}>
            <Text style={styles.inputHeader}>Email Address</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  type="email"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your email address..."
                  inputStyle={styles.inputText}
                  isError={Boolean(errors.email)}
                  leftIcon={
                    <MaterialCommunityIcons name="email-outline" size={28} color={'#888888'} />
                  }
                />
              )}
            />
            {errors.email != null && <Text style={styles.errorTxt}>{errors.email.message}</Text>}
          </View>

          <View style={styles.textInputComponentProperties}>
            <Text style={styles.inputHeader}>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your password..."
                  inputStyle={styles.inputText}
                  isPassword
                  isError={Boolean(errors.password)}
                  leftIcon={
                    <MaterialCommunityIcons name="lock-outline" size={25} color="#888888" />
                  }
                />
              )}
            />
            {errors.password != null && (
              <Text style={styles.errorTxt}>{errors.password.message}</Text>
            )}
          </View>

          <View style={styles.textInputComponentProperties}>
            <Text style={styles.inputHeader}>Confirm Password</Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Confirm your password..."
                  inputStyle={styles.inputText}
                  isPassword
                  isError={Boolean(errors.confirmPassword)}
                  leftIcon={
                    <MaterialCommunityIcons name="lock-outline" size={25} color="#888888" />
                  }
                />
              )}
            />
            {errors.confirmPassword != null && (
              <Text style={styles.errorTxt}>{errors.confirmPassword.message}</Text>
            )}
          </View>

          {/* Gender Drop down picker Here */}
          <Text style={[styles.inputHeader, styles.genderHeaderStyle]}>Gender</Text>
          <View style={styles.genderInputView}>
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <View style={styles.genderInputContainer}>
                  <MaterialCommunityIcons name="gender-male" size={27} color="#888888" />
                  <RNPickerSelect
                    onValueChange={gender => onChange(gender)}
                    value={value || null} // Handle initial value correctly
                    placeholder={{
                      label: 'Select Your Gender...',
                      value: null
                    }}
                    items={[
                      { label: ' Male', value: 'male' },
                      { label: 'Female', value: 'female' }
                    ]}
                    style={{
                      inputAndroid: {
                        color: value ? 'black' : '#888888', // Placeholder vs. selected value color on Android
                        fontSize: 16,
                        paddingHorizontal: 10
                      },
                      inputIOS: {
                        color: value ? 'black' : '#888888', // Placeholder vs. selected value color on iOS
                        fontSize: 16,
                        paddingHorizontal: 10
                      },
                      placeholder: {
                        color: '#888888', // Ensure placeholder text color shows on both platforms
                        fontFamily: 'WorkSansMedium'
                      }
                    }}
                    useNativeAndroidPickerStyle={false} // Use custom styling on Android
                  />
                </View>
              )}
            />
          </View>
          <View style={styles.genderErrorTextPosition}>
            {errors.gender && <Text style={styles.errorTxt}>{errors.gender.message}</Text>}
          </View>

          <View style={styles.textInputComponentProperties}>
            <Text style={styles.inputHeader}>Birth Date</Text>
            <Controller
              control={control}
              name="birthDate"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity style={styles.birthdayInputcontainer} onPress={handleSelectDate}>
                  <View style={styles.textInput}>
                    <View style={styles.birthdayInputPlaceholderStyle}>
                      <AntDesign name="calendar" size={25} color={'#888888'} />
                      <Text style={styles.birthdayInputPlaceholderText}>
                        {selectedDate === '' ? (
                          'Enter your birth date...'
                        ) : (
                          <Text style={styles.inputText}>{selectedDate}</Text>
                        )}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
            {modalVisible && (
              <DatePicker
                modal
                mode="date"
                open={modalVisible}
                date={date}
                dividerColor="white"
                onConfirm={handleConfirmDate}
                onCancel={() => {
                  setModalVisible(false);
                }}
                theme="dark"
              />
            )}
            {errors.birthDate != null && (
              <Text style={styles.errorTxt}>{errors.birthDate.message}</Text>
            )}
          </View>
        </View>

        <View style={styles.SignInbuttonPosition}>
          <CustomButton
            onPress={handleSubmit(handleSignUp)}
            disabled={disable}
            icon={<AntDesign name="arrowright" size={25} color={colors.white} />}
            text="Sign Up"
          />
        </View>

        {/* <View style={styles.signUpWithPartPosition}>
          <View style={styles.signUpWithPart}>
            <View style={styles.signUpWithHorizontalLine}></View>
            <Text style={styles.signUpWithText}>Sign Up With</Text>
            <View style={styles.signUpWithHorizontalLine}></View>
          </View>
        </View>
        <View style={styles.signUpWithIconsContainer}>
          <TouchableOpacity>
            <View style={styles.signUpWithIcons}>
              <FontAwesome name="facebook" size={25} color={colors.buttonBg}></FontAwesome>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.signUpWithIcons}>
              <FontAwesome name="google" size={25} color={colors.buttonBg}></FontAwesome>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.signUpWithIcons}>
              <FontAwesome name="instagram" size={25} color={colors.buttonBg}></FontAwesome>
            </View>
          </TouchableOpacity>
        </View> */}

        <View style={styles.askAboutAccount}>
          <Text style={styles.askAboutAccountText}>Already have an account? {'  '}</Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signUpText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateAccount;
