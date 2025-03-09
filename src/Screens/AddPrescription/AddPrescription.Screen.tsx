import React, { type FC, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';

import { setPrescriptionAction } from '@/store/slices/features/prescription/slice';
import { type ImageFile as ImageFiles } from '@/store/slices/features/prescription/types';

import UploadPrescriptionLogo from '../../assets/upload-prescription';
import Header from '../../Components/Header/Header';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './style';
import { colors } from '@/theme/colors';
import CustomButton from '@/Components/CustomButton/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootState } from '@/store';

const AddPrescription: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const route = useRoute();
  const { prevRoute } = route.params as { prevRoute: string };

  const [selectedImage, setSelectedImage] = useState<{ uri: string; name: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Track upload progress
  const [isUploading, setIsUploading] = useState<boolean>(false); // Track if uploading

  const uploadedImage = useSelector((state: RootState) => state.prescription.ImageFile);

  console.log(uploadedImage, 'uploadedImage');

  const handleChoosePhoto = async (): Promise<void> => {
    try {
      const response = await launchImageLibrary({ mediaType: 'photo' });

      if (response.assets !== undefined) {
        const imageFile: ImageFiles[] = response.assets.map(asset => ({
          originalPath: asset.originalPath ?? '',
          type: asset.type ? asset.type.split('/')[1] : '', // Extract type (jpeg or png)
          height: asset.height ?? 0,
          width: asset.width ?? 0,
          fileName: asset.fileName ?? 'Unnamed',
          fileSize: asset.fileSize ?? 0,
          uri: asset.uri ?? ''
        }));

        // Store the first image's URI and file name
        setSelectedImage({
          uri: imageFile[0]?.uri ?? '',
          name: imageFile[0]?.fileName ?? 'Unnamed'
        });

        // Simulate the upload process
        await simulateUpload(imageFile[0]);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const removeSelectedImage: any = () => {
    setSelectedImage(null); // Clear the selected image
  };

  const simulateUpload = async (image: ImageFiles) => {
    console.log(image, '>>>>>>>>>>>>>>>>>');
    setIsUploading(true);
    setUploadProgress(0); // Reset progress

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          return 100; // Ensure it doesn't go over 100%
        }
        return prev + 10; // Increase progress by 10%
      });
    }, 300); // Update every 300 milliseconds

    // Optional: Clear the interval after a certain time (for example, 3 seconds)
    setTimeout(() => {
      clearInterval(interval);
      setIsUploading(false);
    }, 3000); // Total time for simulated upload
    // Dispatch to Redux store when upload completes
    dispatch(
      setPrescriptionAction({
        assets: [image] // Pass the image array
      })
    );
  };

  const handleNext: any = () => {
    setSelectedImage(null);
    navigation.navigate(`${prevRoute}` as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingPosition}>
        <Header mainHeader="Prescription" />
      </View>
      <View style={styles.imagePosition}>
        <UploadPrescriptionLogo />
      </View>
      <View style={styles.subHeadingPosition}>
        <Text style={styles.chooseFileHeaderText}>Upload a Prescription</Text>
      </View>
      <View style={styles.fileSelectionContentPosition}>
        <View style={styles.chooseFileBackground}>
          <Text style={styles.mainText}>Drag or drop file here</Text>
          <Text style={styles.subText}>-OR-</Text>
          <View style={styles.chooseFileButtonPosition}>
            <TouchableOpacity
              onPress={() => {
                handleChoosePhoto().catch(error => {
                  console.error('Error selecting image:', error);
                });
              }}
              style={styles.chooseFileButton}>
              <Text style={styles.chooseFileText}>Choose File</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {selectedImage !== null ? (
        <View style={styles.uploadedfilesPosition}>
          <Text style={styles.fliesHeaderText}>Files</Text>
          <View style={styles.filesIconPosition}>
            <SimpleLineIcons name="docs" size={27} color={colors.buttonBg} />
            <View>
              {selectedImage != null ? ( // Use explicit null check
                <>
                  <View style={styles.imagePreviewContainer}>
                    <Text style={styles.imageNameStyle}>{selectedImage?.name}</Text>
                    {isUploading && (
                      <Text style={styles.uploadProgressText}>{uploadProgress}%</Text>
                    )}

                    {/* Remove or disselect image */}
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => removeSelectedImage()}>
                      <Entypo name="cross" size={18} color={colors.header} />
                    </TouchableOpacity>
                  </View>
                  {/*  */}
                </>
              ) : (
                <></>
              )}
              {isUploading && (
                <View style={styles.uploadProgressContainer}>
                  <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: `${uploadProgress}%` }]} />
                  </View>
                </View>
              )}
              {selectedImage !== null ? (
                <View style={styles.SavebuttonPosition}>
                  <CustomButton
                    onPress={handleNext}
                    icon={<AntDesign name="arrowright" size={30} color={colors.white} />}
                    text="Save"
                  />
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default AddPrescription;
