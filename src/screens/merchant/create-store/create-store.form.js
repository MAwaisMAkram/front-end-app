import React, {useState} from 'react';
import {Image, ActivityIndicator, ScrollView, View} from 'react-native';
import {Field} from 'formik';
import {Formik} from 'formik';
import styles from './create-store.style';
import * as Yup from 'yup';
import AppFormField from '../../../components/form-components/form-field';
import FormSubmitButton from '../../../components/form-components/form-submit-button';
import {FormFieldSeprator} from '../../../components/form-field-seperator';
import {baseUrl} from '../../../redux/actions/base-url';
import {Text} from '../../../components/text';
import AlertCmp from '../../../components/Alert/alert-banner';
import {COLOR} from '../../../config/color';
import {
  launchImageLibrary,
  CameraOptions,
  Callback,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  store_name: Yup.string().required(' Store name is required'),
  store_city: Yup.string().required('City name is required'),
});

const EditProfileForm = ({handleSubmit, disabled}) => {
  const [imagePath, setImagePath] = useState('');
  const [loadImage, setLoading] = useState(false);
  const [storeImageUrl, setImageUrl] = useState('');
  const initialValues = {
    store_name: '',
    store_city: '',
    store_image: storeImageUrl,
  };
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, onImageSelected);
  };

  const onImageSelected: Callback = (response: ImagePickerResponse) => {
    response.assets?.map(image => {
      setImagePath(image.uri);
      uploadImage(image);
    });
  };

  const uploadImage = (imageData: Asset) => {
    const formData = new FormData();
    setLoading(true);
    formData.append('image', {
      uri: imageData.uri,
      type: imageData.type,
      name: imageData.fileName,
    });
    console.log('FormData', formData);
    axios
      .post(`${baseUrl}/api/images/single-image-upload`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        setImageUrl(res.data.imageUrl);
        setLoading(false);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}>
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <AlertCmp />
          <TouchableOpacity style={styles.imageContainer} onPress={openCamera}>
            {loadImage ? (
              <ActivityIndicator size="small" color="green" />
            ) : imagePath ? (
              <Image
                source={{uri: imagePath}}
                style={styles.selectedImage}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.text}>Select Image</Text>
            )}
          </TouchableOpacity>
          <Field
            component={AppFormField}
            name="store_name"
            placeholder="Store name"
          />

          <FormFieldSeprator />

          <Field
            component={AppFormField}
            name="store_city"
            placeholder="Store city name"
          />

          <FormFieldSeprator />
          <FormSubmitButton
            title={
              disabled ? (
                <ActivityIndicator animating={true} color={COLOR.WHITE} />
              ) : (
                'Create'
              )
            }
            disabled={disabled}
          />
        </ScrollView>
      </View>
    </Formik>
  );
};
export default EditProfileForm;
