import React, {useEffect, type FC} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useNavigation} from '@react-navigation/native';

import {type RootState} from '../../store';

import MedicineImage from '../../assets/medicine-image';
import CustomButton from '../../Components/CustomButton/CustomButton';
import {colors} from '../../theme/colors';

import styles from './style';
import {AppStackParamList} from '../../models/routePageModel';
import {setQrCodeToScanData} from '../../store/slices/features/medicineDetails/slice';

type MedicineDetailsRouteProp = RouteProp<AppStackParamList, 'MedicineDetails'>;

const MedicineDetails: FC<{route: MedicineDetailsRouteProp}> = ({route}) => {
  const navigation = useNavigation();

  const {scannedData} = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    if (scannedData) {
      dispatch(setQrCodeToScanData(scannedData));
    }
  }, [scannedData, dispatch]);

  const manufacturer = useSelector(
    (state: RootState) => state.medicineDetails.manufacturer,
  );

  const brandName = useSelector(
    (state: RootState) => state.medicineDetails.brandName,
  );

  const dosageFromStrength = useSelector(
    (state: RootState) => state.medicineDetails.dosageFromStrength,
  );

  const indication = useSelector(
    (state: RootState) => state.medicineDetails.indication,
  );

  const sideEffects = useSelector(
    (state: RootState) => state.medicineDetails.sideEffects,
  );

  const dose = useSelector((state: RootState) => state.medicineDetails.dose);

  const contraindication = useSelector(
    (state: RootState) => state.medicineDetails.contraindication,
  );

  const handlePress: any = () => {
    // authStatus
    //   ? navigation.navigate('MedicineDoses' as never)
    //   : navigation.navigate('MedicineDoses' as never);

    // if (appLoadFirstTime) dispatch(updateFirstTimeQrScreen());

    navigation.navigate('MedicineDoses' as never);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.imagePosition}>
          <MedicineImage />
        </View>

        <View style={styles.medicineNameAndBrandPosition}>
          <View style={styles.medicineNameTypeProperties}>
            <Text style={styles.medicineNameText}>{manufacturer}</Text>
            <View style={styles.medicineTypePosition}>
              <Text style={styles.medicineTypeText}>{brandName}</Text>
            </View>
          </View>
          <Text style={styles.brandNameText}>{dosageFromStrength}</Text>
        </View>

        <View style={styles.medicineTypeAndQuantityPosition}>
          <View style={styles.medicineTypeAndQuantityStyle}>
            <View style={styles.medicineTypeAndQuantityProperties}>
              <View style={styles.iconPosition}>
                <MaterialCommunityIcons
                  name="pill"
                  size={17}
                  color={colors.header}
                />
              </View>
              <Text style={styles.medicineTypeAndQuantityText}>
                {indication}
              </Text>
            </View>
          </View>
          <View style={styles.medicineTypeAndQuantityStyle}>
            <View style={styles.medicineTypeAndQuantityProperties}>
              <View style={styles.iconPosition}>
                <SimpleLineIcons name="drop" size={16} color={colors.header} />
              </View>
              <Text style={styles.medicineTypeAndQuantityText}>
                {sideEffects}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.medicineDetailsComponentPosition}>
          <View style={styles.medicineDetailsComponentProperties}>
            <Text style={styles.inputHeader}>Product Details</Text>
            <View style={styles.medicineDetailscontainer}>
              <View style={styles.textPosition}>
                <Text style={styles.scannedText}>{dose}</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.medicineDetailsComponentProperties}>
              <Text style={styles.inputHeader}>Product Details</Text>
              <View style={styles.medicineDetailscontainer}>
                <View style={styles.textPosition}>
                  <Text style={styles.scannedText}>{contraindication}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonPosition}>
        <CustomButton
          onPress={() => handlePress()}
          icon={
            <Icon
              name="calendar-number-outline"
              size={30}
              color={colors.white}
            />
          }
          text="Schedule Dosage"
          pageName="MedicineDetails"
        />
      </View>
    </View>
  );
};

export default MedicineDetails;
