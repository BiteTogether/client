import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

import { COLORS, FONTS } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { registerUser, clearError } from '../../store/slices/authSlice';
import { RegisterForm } from './components/RegisterForm';
import appLogo from '@assets/app_logo.png';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  const initialValues = { fullName: '', username: '', email: '', phoneNumber: '', password: '', confirmPassword: '' };
  const validationSchema = Yup.object({
    fullName: Yup.string().required(t('full_name_required')),
    username: Yup.string().required(t('username_required')),
    email: Yup.string().email(t('email_invalid')).required(t('email_required')),
    phoneNumber: Yup.string()
      .matches(/^0\d{9}$/, t('phone_number_invalid'))
      .required(t('phone_number_required')),
    password: Yup.string()
      .min(8, t('password_invalid', { min: 8 }))
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, t('password_invalid', { min: 8 }))
      .required(t('password_required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('passwords_must_match'))
      .required(t('confirm_password_required')),
  });

  const onSubmit = async (values: any) => {
    // eslint-disable-next-line
    const { confirmPassword, ...dataToSend } = values;
    try {
      const res = await dispatch(registerUser(dataToSend));
      if (registerUser.fulfilled.match(res)) {
        // Register successful
        Toast.show({
          type: 'success',
          text1: res.payload.message,
          text2: t('please_login_to_continue'),
        });
        navigation.navigate('Login' as never);
      } else {
        // Register failed
        console.error('Register failed:', res.payload);
      }
    } catch (e: any) {
      console.error('Register error:', e);
    }
  };

  useEffect(() => {
    // Reset error when entering register screen
    dispatch(clearError());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={appLogo} 
          style={styles.appLogo}
        />
        <Text style={styles.appName}>BiteTogether</Text>
      </View>

      <View style={styles.content}>
        <RegisterForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => { onSubmit(values); }}
        >
          {(formikProps) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder='Full Name'
                value={formikProps.values.fullName}
                onChangeText={formikProps.handleChange('fullName')}
                onBlur={formikProps.handleBlur('fullName')}
              />
              {formikProps.touched.fullName && formikProps.errors.fullName ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.fullName}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder='Username'
                value={formikProps.values.username}
                onChangeText={formikProps.handleChange('username')}
                onBlur={formikProps.handleBlur('username')}
              />
              {formikProps.touched.username && formikProps.errors.username ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.username}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder='Email'
                keyboardType='email-address'
                value={formikProps.values.email}
                onChangeText={formikProps.handleChange('email')}
                onBlur={formikProps.handleBlur('email')}
              />
              {formikProps.touched.email && formikProps.errors.email ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.email}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder='Phone Number'
                keyboardType='phone-pad'
                value={formikProps.values.phoneNumber}
                onChangeText={formikProps.handleChange('phoneNumber')}
                onBlur={formikProps.handleBlur('phoneNumber')}
              />
              {formikProps.touched.phoneNumber && formikProps.errors.phoneNumber ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.phoneNumber}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry
                value={formikProps.values.password}
                onChangeText={formikProps.handleChange('password')}
                onBlur={formikProps.handleBlur('password')}
              />
              {formikProps.touched.password && formikProps.errors.password ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.password}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder='Confirm Password'
                secureTextEntry
                value={formikProps.values.confirmPassword}
                onChangeText={formikProps.handleChange('confirmPassword')}
                onBlur={formikProps.handleBlur('confirmPassword')}
              />
              {formikProps.touched.confirmPassword && formikProps.errors.confirmPassword ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.confirmPassword}</Text>
              ) : null}

              {(error) && (
                <Text style={{ color: 'red', marginVertical: 8 }}>{error}</Text>
              )}

              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.5 }]}
                onPress={() => formikProps.handleSubmit()}
                disabled={loading}
              >
                <Text style={styles.button_title}>{t('sign_up')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </RegisterForm>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('already_have_an_account')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
          <Text style={styles.loginNavigation}>{t('login')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  appLogo: {
    width: 50,
    height: 50,
  },
  appName: {
    fontSize: FONTS.SIZES.TITLE,
    fontWeight: '500',
    paddingBottom: 5,
  },
  content: {
    flex: 10,
    width: '80%',
    justifyContent: 'flex-start',
    marginTop: '20%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: COLORS.BORDER,
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: COLORS.BORDER,
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.TEXT.PRIMARY,
  },
  footer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 3,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
  },
  footerText: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.TEXT.LIGHT,
    paddingBottom: 20,
  },
  loginNavigation: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.TEXT.PRIMARY,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: COLORS.ACCENT,
    padding: 12,
    borderRadius: 5,
    marginVertical: 10,
  },
  button_title: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegisterScreen;
