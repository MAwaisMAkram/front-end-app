/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, SafeAreaView, Image, ScrollView} from 'react-native';
import {Text} from '../../components/text';
import styles from './contact.style';

const ContactUsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <Option
          title="+92 312 6803305"
          imageSource={require('../../assets/icons/call.png')}
        />
        <OptionSeparator />
        <Option
          title="mawaisakram123@gmail.com"
          imageSource={require('../../assets/icons/email.png')}
        />
        <Option
          title="GCU Faisalabad"
          imageSource={require('../../assets/icons/map.png')}
        />
        <OptionSeparator />
      </ScrollView>
    </SafeAreaView>
  );
};

const Option = ({title, imageSource}) => {
  return (
    <View style={styles.option}>
      <View style={styles.optionContainer}>
        <View style={styles.optionIconContainer}>
          {/* Replace with icon */}
          <Image source={imageSource} />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

const OptionSeparator: React.FC = () => <View style={styles.optionSeparator} />;

export default ContactUsScreen;
