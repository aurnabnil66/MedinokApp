/* eslint-disable */
import React, { type FC, useState } from 'react';
import { FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../Components/Header/Header';
import EditProfileModalButton from '../EditProfileModalButton/EditProfileModalButton';
import ModalTextInput from '../ModalTextInput/ModalTextInput';

import styles from './style';
import ToastPopUp from '@/utils/Toast.android';
import axios from 'axios';
import { BASE_URL } from '@/utils/environment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateUser } from '@/store/slices/features/users/slice';

import DatePicker from 'react-native-date-picker';
import moment from 'moment';

interface EditProfileModalProps {
  modalVisible: boolean;
  closeModal: () => void;
}

const GenderOptions = ['Male', 'Female'];

const EditProfileModal: FC<EditProfileModalProps> = ({ modalVisible, closeModal }) => {
  const userName = useSelector((state: RootState) => state.users.user?.data?.user?.fullName);
  const userMobileNumber = useSelector(
    (state: RootState) => state.users.user?.data?.user?.mobileNumber
  );
  const userGender = useSelector((state: RootState) => state.users.user?.data?.user?.gender);
  const userBirthDay = useSelector((state: RootState) => state.users.user?.data?.user?.birthday);

  const [fullName, setFullName] = useState<string>(userName ?? '');
  const [mobile, setMobile] = useState<string>(userMobileNumber ?? '');
  const [gender, setGender] = useState<string>(userGender ?? '');
  const [birthdate, setBirthdate] = useState<string>(userBirthDay ?? '');
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.users.user.data.accessToken);

  const [isGenderDropdownVisible, setIsGenderDropdownVisible] = useState<boolean>(false);

  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleUpdateProfile: any = async () => {
    if (!fullName && !mobile && !gender && !birthdate) {
      ToastPopUp('Please fill in at least one field to update your profile.');
      return; // Exit the function early
    }

    const updateFields: string[] = [];

    // Add each field to the updateFields array if it has a value
    if (fullName) {
      updateFields.push(`fullName: "${fullName}"`);
    }
    if (mobile) {
      updateFields.push(`mobileNumber: "${mobile}"`);
    }
    if (gender) {
      updateFields.push(`gender: "${gender}"`);
    }
    if (birthdate) {
      updateFields.push(`birthday: "${birthdate}"`);
    }

    // Join the fields to create the mutation input
    const mutationInput = updateFields.join(', ');

    const mutation = `
      mutation {
        updateProfile(updateProfileInput: {
             ${mutationInput}
        }) {
          id
          fullName
          mobileNumber
          email
          gender
          birthday
        }
      }
    `;

    try {
      const response = await axios.post(
        BASE_URL,
        {
          query: mutation
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Handle response messages
      if (response?.data?.data?.updateProfile) {
        const updatedProfile = response.data.data.updateProfile;

        // Create an object similar to the desired structure
        const updatedUserData = {
          accessToken: accessToken, // Retain the existing access token
          user: {
            fullName: updatedProfile.fullName,
            birthday: updatedProfile.birthday,
            email: updatedProfile.email, // Ensure email is available in the response
            mobileNumber: updatedProfile.mobileNumber,
            gender: updatedProfile.gender
          }
        };

        dispatch(updateUser(updatedUserData));
        closeModal();
        ToastPopUp('Profile updated successfully!');
      } else if (Array.isArray(response?.data?.errors) && response.data.errors.length > 0) {
        const errorMessage: any = response?.data?.errors[0]?.message;
        if (typeof errorMessage === 'string') {
          ToastPopUp(errorMessage);
        }
      } else {
        ToastPopUp('Something went wrong! Please try again later.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response?.data); // Log the error response
      } else {
        console.error('Unexpected Error:', error);
      }
      ToastPopUp('Network Error! Please check your connection.');
    }
  };

  const renderGenderOption = (option: string) => (
    <TouchableOpacity
      style={{
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff'
      }}
      onPress={() => {
        setGender(option);
        setIsGenderDropdownVisible(false);
      }}>
      <Text style={{ color: 'black', fontSize: 16 }}>{option}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Header mainHeader="Edit Profile" />
              <TouchableOpacity onPress={closeModal}>
                <AntDesign name="close" size={25} color="#888888" />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              <View style={styles.textInputComponentPosition}>
                <View style={styles.textInputComponentProperties}>
                  <Text style={styles.inputHeader}>Full Name</Text>
                  <ModalTextInput
                    type="email"
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter your full name..."
                    inputStyle={styles.inputText}
                    leftIcon={<AntDesign name="user" size={25} color={'#888888'} />} // Left icon
                  />
                </View>

                <View style={styles.textInputComponentProperties}>
                  <Text style={styles.inputHeader}>Mobile Number</Text>
                  <ModalTextInput
                    type="mobile"
                    value={mobile}
                    onChangeText={setMobile}
                    placeholder="Enter your mobile number..."
                    inputStyle={styles.inputText}
                    leftIcon={<Feather name="smartphone" size={25} color={'#888888'} />}
                  />
                </View>

                <View style={styles.textInputComponentProperties}>
                  <Text style={styles.inputHeader}>Gender</Text>
                  <View style={styles.genderInputView}>
                    <View style={styles.genderIconPosition}>
                      <MaterialCommunityIcons name="gender-male" size={25} color="#888888" />
                    </View>
                    <TouchableOpacity
                      style={styles.dropDownIconPosition}
                      onPress={() => setIsGenderDropdownVisible(!isGenderDropdownVisible)}>
                      <AntDesign name="down" size={18} color="#888888" />
                    </TouchableOpacity>
                    <View style={styles.genderPlaceHolderStyle}>
                      {gender === '' ? (
                        <Text style={styles.genderPlaceHolderText}>{'Select Gender...'}</Text>
                      ) : (
                        <Text style={styles.genderText}>{gender}</Text>
                      )}
                    </View>
                  </View>
                  {isGenderDropdownVisible && (
                    <View style={styles.dropDownStyle}>
                      <FlatList
                        data={GenderOptions}
                        keyExtractor={item => item}
                        renderItem={({ item }) => renderGenderOption(item)}
                      />
                    </View>
                  )}
                </View>

                <View style={styles.textInputComponentProperties}>
                  <Text style={styles.inputHeader}>Birth Date</Text>
                  <View style={styles.genderInputView}>
                    <View style={styles.genderIconPosition}>
                      <AntDesign name="calendar" size={25} color={'#888888'} />
                    </View>
                    <TouchableOpacity
                      style={styles.dropDownIconPosition}
                      onPress={() => setIsDatePickerVisible(!isDatePickerVisible)}>
                      <AntDesign name="down" size={18} color="#888888" />
                    </TouchableOpacity>
                    <View style={styles.genderPlaceHolderStyle}>
                      {birthdate === '' ? (
                        <Text style={styles.genderPlaceHolderText}>Select Birth Date...</Text>
                      ) : (
                        <Text style={styles.genderText}>{birthdate}</Text>
                      )}
                    </View>
                  </View>

                  {/* DatePicker Component */}
                  {isDatePickerVisible && (
                    <>
                      <View style={styles.datePickerPosition}>
                        <DatePicker
                          date={selectedDate}
                          onDateChange={(date: Date) => setSelectedDate(date)}
                          mode="date"
                          //style={styles.datePickerStyle}
                          dividerColor="#888888"
                          theme="light"
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.confirmDateButton}
                        onPress={() => {
                          if (selectedDate > new Date()) {
                            ToastPopUp('Please select a valid date.');
                          } else {
                            setBirthdate(formatDate(selectedDate));
                            setIsDatePickerVisible(false);
                          }
                        }}
                        disabled={selectedDate > new Date()} // Disable the button if the date is in the future
                      >
                        {selectedDate >= new Date() ? (
                          <Text style={styles.birthDateErrorText}>Cannot select future date</Text>
                        ) : (
                          <Text style={styles.confirmDateButtonText}>Confirm</Text>
                        )}
                      </TouchableOpacity>
                    </>
                  )}
                </View>

                <View style={styles.UpdatebuttonPosition}>
                  <EditProfileModalButton
                    onPress={handleUpdateProfile}
                    icon={<></>}
                    text="Update"
                    disabled={selectedDate > new Date()}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfileModal;
