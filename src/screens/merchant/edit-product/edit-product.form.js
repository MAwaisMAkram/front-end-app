import React, {useState} from 'react';
import {Image, ActivityIndicator, ScrollView, View} from 'react-native';
import {Field} from 'formik';
import {Formik} from 'formik';
import styles from './edit-product.style';
import * as Yup from 'yup';
import AppFormField from '../../../components/form-components/form-field';
import FormSubmitButton from '../../../components/form-components/form-submit-button';
import SelectPickerField from '../../../components/form-components/select-picker';
import {FormFieldSeprator} from '../../../components/form-field-seperator';
import {baseUrl} from '../../../redux/actions/base-url';
import {Text} from '../../../components/text';
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
  title: Yup.string().required(' Title is required'),
  store_name: Yup.string().required('Store  is required'),
  category_name: Yup.string().required(' Category is required'),
  actual_price: Yup.string().required('Price is required'),
  description: Yup.string().required(' Description is required'),
});

const EditProductForm = ({
  handleSubmit,
  store_items,
  category_items,
  title,
  category_name,
  store_name,
  actual_price,
  discount,
  description,
  product_image,
  disabled,
}) => {
  const [imagePath, setImagePath] = useState('');
  const [loadImage, setLoading] = useState(false);
  const [productImageUrl, setProductImageUrl] = useState(product_image);
  const initialValues = {
    title: title,
    store_name: store_name,
    category_name: category_name,
    actual_price: actual_price.toString(),
    discount: discount ? discount.toString() : null,
    description: description,
    product_image: productImageUrl ? productImageUrl : product_image,
  };
  const openCamera = () => {
    const options: CameraOptions = {
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
        setProductImageUrl(res.data.imageUrl);
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
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity style={styles.imageContainer} onPress={openCamera}>
            {loadImage ? (
              <ActivityIndicator size="small" color="green" />
            ) : imagePath || product_image ? (
              <Image
                source={{uri: imagePath ? imagePath : product_image}}
                style={styles.selectedImage}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.text}>Select Image</Text>
            )}
          </TouchableOpacity>
          <Field component={AppFormField} name="title" placeholder="Title" />

          <FormFieldSeprator />

          <Field
            component={SelectPickerField}
            name="store_name"
            placeholder="Select store"
            items={store_items}
          />

          <FormFieldSeprator />

          <Field
            component={SelectPickerField}
            name="category_name"
            placeholder="Select category"
            items={category_items}
          />

          <FormFieldSeprator />

          <Field
            component={AppFormField}
            name="actual_price"
            placeholder="Price"
            keyboardType="numeric"
          />

          <FormFieldSeprator />

          <Field
            component={AppFormField}
            name="discount"
            placeholder="Discount in percentage % (optional)"
            keyboardType="numeric"
          />

          <FormFieldSeprator />

          <Field
            component={AppFormField}
            name="description"
            placeholder="Description"
          />

          <FormFieldSeprator />

          <FormFieldSeprator />
          <FormSubmitButton
            title={
              disabled ? (
                <ActivityIndicator animating={true} color={COLOR.WHITE} />
              ) : (
                'Save'
              )
            }
            disabled={disabled}
          />
        </ScrollView>
      </View>
    </Formik>
  );
};
export default EditProductForm;
