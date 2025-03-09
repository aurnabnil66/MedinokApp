import React, { type FC, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import GuestImage from '../../assets/guest-image';
import EditProfileModal from '../../Components/EditProfileModal/EditProfileModal';
import Header from '../../Components/Header/Header';

import styles from './style';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const UserProfile: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const userName = useSelector((state: RootState) => state.users.user?.data?.user?.fullName);
  const userMobileNumber = useSelector(
    (state: RootState) => state.users.user?.data?.user?.mobileNumber
  );
  const userGender = useSelector((state: RootState) => state.users.user?.data?.user?.gender);
  const userBirthDay = useSelector((state: RootState) => state.users.user?.data?.user?.birthday);

  // Function to open modal
  const openModal: any = () => {
    setModalVisible(true);
  };

  // Function to close modal
  const closeModal: any = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingPosition}>
        <Header mainHeader="Profile Details" />
      </View>
      <View style={styles.userImagePosition}>
        <GuestImage />
        <Text style={styles.userNameUnderProfileImage}>{userName}</Text>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
          {modalVisible && <EditProfileModal modalVisible={modalVisible} closeModal={closeModal} />}
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.userDetailsComponentPosition}>
          <View style={styles.userDetailsComponentProperties}>
            <Text style={styles.inputHeader}>Full Name</Text>
            <View style={styles.detailInfo}>
              <Text style={styles.detailInfoText}>{userName}</Text>
            </View>
          </View>

          <View style={styles.userDetailsComponentProperties}>
            <Text style={styles.inputHeader}>Mobile Number</Text>
            <View style={styles.detailInfo}>
              <Text style={styles.detailInfoText}>{userMobileNumber}</Text>
            </View>
          </View>
          <View style={styles.userDetailsComponentProperties}>
            <Text style={styles.inputHeader}>Gender</Text>
            <View style={styles.detailInfo}>
              <Text style={styles.detailInfoText}>{userGender}</Text>
            </View>
          </View>
          <View style={styles.userDetailsComponentProperties}>
            <Text style={styles.inputHeader}>Birth Date</Text>
            <View style={styles.detailInfo}>
              <Text style={styles.detailInfoText}>{userBirthDay}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;
