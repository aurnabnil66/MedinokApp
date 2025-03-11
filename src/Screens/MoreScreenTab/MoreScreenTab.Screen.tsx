import React, {useState, type FC} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../Components/Header/Header';
import styles from './style';
import {RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButton from '../../Components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import filterDuplicateMedicines from '../../utils/filterDuplicateMedicine';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import RefilMedicineModal from '../../Components/RefilMedicineModal/RefilMedicineModal';
import {
  setRefilMedicine,
  setTakeMedicine,
} from '../../store/slices/features/medicineDetailsExtraSetting/slice';

const MoreScreenTab: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const storedMedicineList = useSelector(
    (state: RootState) => state.medicineDetails.storedMedicineList,
  );
  const appointMentList = useSelector(
    (state: RootState) => state.appointment.storeAppointmentList,
  );
  const prescriptionList = useSelector(
    (state: RootState) => state.prescription.ImageFile,
  );
  const medReminderList = useSelector(
    (state: RootState) =>
      state.medicineDetailsExtraSetting.storeMedicineReminder,
  );

  const selectedDate = useSelector(
    (state: RootState) => state.medicineDetails.selectedDates,
  );

  // States to handle the expansion of each list
  const [isMedicineListExpanded, setIsMedicineListExpanded] = useState(false);
  const [isAppointmentListExpanded, setIsAppointmentListExpanded] =
    useState(false);
  const [isPrescriptionListExpanded, setIsPrescriptionListExpanded] =
    useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMed, setSelectedMed] = useState('');

  const handleBack = (): void => {
    navigation.goBack();
  };

  const handleRefillModal = (medlocId: string) => {
    setSelectedMed(medlocId);
    setModalVisible(true);
  };

  const handleSubmit: any = () => {};

  const filteredMedicineList = storedMedicineList.filter(medicine => {
    const medicineDateString = moment(medicine.selectedDateTime).format(
      'YYYY-MM-DD',
    );
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

    // Return medicines where the dates match
    return medicineDateString === formattedDate;
  });

  const getMedLeftValue = (medId: string) => {
    const med = medReminderList.find(
      medicine => medicine.medicineLocalId === medId,
    );
    console.log('med', med);
    return med ? med.medicineReminderCurrentStock : '0';
  };

  const getRequiredValue = (medId: string) => {
    const med = medReminderList.find(
      medicine => medicine.medicineLocalId === medId,
    );
    console.log('require', med?.medicineReminderTotalReq);
    return med ? med.medicineReminderTotalReq : '0';
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingPosition}>
        <Header mainHeader="More Settings" />
      </View>
      {filteredMedicineList.length === 0 &&
      appointMentList.length === 0 &&
      prescriptionList.length === 0 ? (
        <View style={styles.emptyDataTextPosition}>
          <Text style={styles.emptyDataTextStyle}>No Data to Show</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainerStyle}>
          {/* Medicine List */}
          <View style={styles.refillsHeadingProperties}>
            {filteredMedicineList.length > 0 && (
              <View style={styles.moreSettingsListStyle}>
                <View style={styles.itemHeaderStyle}>
                  <Text style={styles.refillsText}>Inventory</Text>
                  <View style={styles.viewButtonPosition}>
                    <TouchableOpacity
                      onPress={() =>
                        setIsMedicineListExpanded(!isMedicineListExpanded)
                      }>
                      <Text style={styles.pillsLeft}>
                        {isMedicineListExpanded ? 'View Less' : 'View All'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.medicineDoseComponentPosition}>
                  <FlatList
                    data={
                      isMedicineListExpanded
                        ? filterDuplicateMedicines(filteredMedicineList)
                        : filteredMedicineList.slice(0, 1)
                    }
                    renderItem={({item: medicine, index}) => (
                      <View key={index} style={styles.inventoryChip}>
                        <View style={styles.medicineDoseProperties}>
                          <View style={styles.doseDetailsPosition}>
                            <View style={styles.medicineNameAndPillsLeft}>
                              <Text style={styles.pillsLeft}>
                                {medicine.medicineName}
                              </Text>
                              <Text style={styles.pillsLeft}>
                                {getMedLeftValue(medicine?.medicineLocalId)}{' '}
                                Med(s) left
                              </Text>
                            </View>

                            <View style={styles.refilButtonPropeties}>
                              <View>
                                <Text style={styles.pillsLeftDetailsText}>
                                  Required{' '}
                                  {getRequiredValue(medicine.medicineLocalId)}{' '}
                                  Med(s)
                                </Text>
                                <Text style={styles.pillsLeftDetailsText}>
                                  Took{' '}
                                  {parseInt(medicine.doseQuantity) > 1
                                    ? `${medicine.doseQuantity} Med(s)`
                                    : `${medicine.doseQuantity} Med`}
                                </Text>
                              </View>
                              <View style={styles.refilButtonPosition}>
                                <TouchableOpacity
                                  style={styles.refilButton}
                                  onPress={() =>
                                    handleRefillModal(medicine.medicineLocalId)
                                  }>
                                  <Feather
                                    name="clipboard"
                                    size={16}
                                    color={'#fff'}
                                  />
                                  <Text style={styles.refilButtonText}>
                                    Refil
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() =>
                                    dispatch(
                                      setTakeMedicine({
                                        medicineLocalId:
                                          medicine.medicineLocalId,
                                        doseQuantity: Number(
                                          medicine.doseQuantity,
                                        ),
                                      }),
                                    )
                                  }>
                                  <Text style={{color: 'red', fontSize: 16}}>
                                    Click
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>

                            <View style={styles.remindLeftTextPosition}>
                              <Text style={styles.remindLeftText}>
                                Reminder: When 5 Meds Remaining
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                </View>
              </View>
            )}
          </View>

          {/* Appointment List */}
          <View style={styles.refillsHeadingProperties}>
            {appointMentList.length > 0 && (
              <View style={styles.moreSettingsListStyle}>
                <View style={styles.itemHeaderStyle}>
                  <Text style={styles.refillsText}>Appointments</Text>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        setIsAppointmentListExpanded(!isAppointmentListExpanded)
                      }>
                      <Text style={styles.pillsLeft}>
                        {isAppointmentListExpanded ? 'View Less' : 'View All'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.medicineDoseComponentPosition}>
                  <FlatList
                    data={
                      isAppointmentListExpanded
                        ? appointMentList
                        : appointMentList.slice(0, 1)
                    }
                    renderItem={({item: medicine, index}) => (
                      <View key={index} style={styles.chip}>
                        <View style={styles.medicineDoseProperties}>
                          <View style={styles.doseDetailsPosition}>
                            <Text style={styles.pillsLeft}>
                              {medicine.doctorName}
                            </Text>
                            <Text style={styles.pillsLeftDetailsText}>
                              {moment(medicine.date).format(
                                'ddd, MMMM D, YYYY',
                              )}
                            </Text>
                          </View>
                          <View style={styles.pillsLeftPosition}>
                            <Text style={styles.pillsLeft}>
                              {medicine.time}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                </View>
              </View>
            )}
          </View>

          {/* Prescription List */}
          <View style={styles.refillsHeadingProperties}>
            {prescriptionList.length > 0 && (
              <View style={styles.moreSettingsListStyle}>
                <View style={styles.itemHeaderStyle}>
                  <Text style={styles.refillsText}>Prescriptions</Text>
                  <View style={styles.viewButtonPosition}>
                    <TouchableOpacity
                      onPress={() =>
                        setIsPrescriptionListExpanded(
                          !isPrescriptionListExpanded,
                        )
                      }>
                      <Text style={styles.pillsLeft}>
                        {isPrescriptionListExpanded ? 'View Less' : 'View All'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.medicineDoseComponentPosition}>
                  <FlatList
                    data={
                      isPrescriptionListExpanded
                        ? prescriptionList
                        : prescriptionList.slice(0, 1)
                    }
                    renderItem={({item: medicine, index}) => (
                      <View key={index} style={styles.chip}>
                        <View style={styles.medicineDoseProperties}>
                          <Image
                            style={styles.prescriptionImageStyle}
                            source={{uri: decodeURIComponent(medicine.uri)}}
                            resizeMode="cover"
                          />
                          <View style={styles.prescriptionDetailsPosition}>
                            <Text style={styles.pillsLeft}>
                              {medicine.fileName}
                            </Text>
                          </View>
                          <View style={styles.pillsLeftPosition}>
                            <Text style={styles.pillsLeft}>
                              Type: {medicine.type}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                </View>
              </View>
            )}
          </View>

          <View style={styles.BackbuttonPosition}>
            <CustomButton onPress={handleBack} icon={<></>} text="Back" />
          </View>

          {/* Show refil modal */}
          <RefilMedicineModal
            numKeybaordType={true}
            visible={isModalVisible}
            onClose={() => {
              setModalVisible(false);
            }}
            onSubmit={handleSubmit}
            medlocId={selectedMed}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default MoreScreenTab;
