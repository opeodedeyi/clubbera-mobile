import { View, StyleSheet, ScrollView, Image } from 'react-native';
import Logo from '@/Components/Utility/Logo';
import CustomButton from '@/Components/Utility/CustomButton';
import MainInput from '@/Components/Inputs/MainInput';
import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { AppText } from '@/Components/Utility/AppText';

const forgotpassword = () => {
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState('');

  const handlePress = () => {
    if (page === 1) {
      setPage(2);
    } else {
      console.log('====================================');
      console.log('Final button clicked');
      console.log('====================================');
    }
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const isDisabled = !email || !isEmailValid(email);

  return (
    <View style={styles.fullFlex}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            {page === 1 ? (
              <View style={styles.mainContent}>
                <Logo clickable={false}/>
                <View style={styles.textsCotainer}>
                  <AppText style={styles.normalTitle}>Forgot password?</AppText>
                  <AppText style={styles.normalText}>We will send you a mail to reset your password</AppText>
                </View>
                <View style={styles.authFormItems}>
                  <MainInput placeholder="Enter email address" keyboardType="email-address" label="Email address" value={email} setValue={setEmail} autoComplete="email" autoCapitalize="none" />
                </View>
              </View>
            ) : (
              <View style={styles.mainContent}>
                <View style={styles.textsCotainerAlt}>
                  <AppText style={styles.normalTitleAlt}>Email sent!</AppText>
                  <AppText style={styles.normalTextAlt}>We sent an email to your email address. Follow the steps provided in your email to update your password.</AppText>
                </View>
                <View style={styles.authImageCenter}>
                <Image source={require('@/assets/images/email_sent.png')} style={styles.authImageCenterImage} resizeMode="contain"/>
                </View>
              </View>
            )}

            <View style={styles.links}>
                <CustomButton onPress={handlePress} size="fullWidthSize" coloring="defaultColoring" isDisabled={isDisabled}>{ page === 1 ? "Send email" : "Check email" }</CustomButton>
                {page === 1 &&
                  <AppText style={styles.normalText}>Didn’t forget password? <Link href="/login" style={styles.linkStyle}>Login</Link></AppText>
                }
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
    backgroundColor: Colors.colorWhite,
  },

  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.colorWhite,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 400,
    gap: 28,
  },

  mainContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 40,
    borderWidth: 1,
    borderColor: Colors.colorGrayFour,
    borderRadius: 8,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },

  mainContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 24,
  },

  textsCotainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8,
  },

  textsCotainerAlt: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },

  orCotainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 24,
  },

  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.colorWhiteTwo,
    opacity: 0.8,
  },

  orText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18.9,
    letterSpacing: -0.28,
    color: Colors.colorGray,
  },

  authFormItems: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 24,
  },

  links: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  normalTitle: {
    fontFamily: 'GTWalsheimProMedium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22.5,
    letterSpacing: -0.36,
    color: Colors.colorTextInput,
  },

  normalTitleAlt: {
    fontFamily: 'GTWalsheimProMedium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22.5,
    letterSpacing: -0.36,
    color: Colors.colorTextInput,
    textAlign: 'center',
  },

  normalText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18.9,
    letterSpacing: -0.28,
    color: Colors.colorGrayTwo,
  },

  normalTextAlt: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18.9,
    letterSpacing: -0.28,
    color: Colors.colorGrayTwo,
    textAlign: 'center',
  },

  altText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18.9,
    letterSpacing: -0.28,
    color: Colors.colorGrayTwo,
    textAlign: 'center',
  },

  authImageCenter: {
    width: '100%',
    maxWidth: 300,
    maxHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },

  authImageCenterImage: {
    width: '100%',
  },

  linkStyle: {
    color: Colors.mainColor,
    fontFamily: 'GTWalsheimProMedium',
    fontWeight: '500',
  },

  altLinkStyle: {
    color: Colors.colorDarkTwo,
    fontFamily: 'GTWalsheimProRegular',
    fontWeight: '400',
  }
});

export default forgotpassword