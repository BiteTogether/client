import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import appLogo from '@assets/app_logo.png';
import * as Yup from 'yup';

import { COLORS, FONTS } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginUser, clearError } from '../../store/slices/authSlice';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { LoginForm } from './components/LoginForm';
import Toast from 'react-native-toast-message';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  
  const initialValues = { email: '', password: '' };
  const { t } = useTranslation();
  const validationSchema = Yup.object({
    email: Yup.string().email(t('email_invalid')).required(t('email_required')),
    password: Yup.string().required(t('password_required')),
  });

  const onSubmit = async (values: any) => {
    try {
      const res = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(res)) {
        // Login successful
        Toast.show({
          type: 'success',
          text1: res.payload.message,
        });
      } else {
        // Login failed
        console.error('Login failed:', res.payload);
      }
    } catch (e: any) {
      console.error('Login error:', e);
    }
  };

  useEffect(() => {
    // Reset error when entering login screen
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
        <LoginForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => (
            <View>
              <TextInput 
                style={styles.input}
                placeholder='Email'
                keyboardType='email-address'
                value={formikProps.values.email}
                onChangeText={formikProps.handleChange('email')}
                onBlur={formikProps.handleBlur('email')}
                autoCapitalize="none"
              />
              {formikProps.touched.email && formikProps.errors.email ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.email}</Text>
              ) : null}

              <TextInput 
                style={styles.input}
                placeholder='Password'
                secureTextEntry
                value={formikProps.values.password}
                onChangeText={formikProps.handleChange('password')}
                onBlur={formikProps.handleBlur('password')}
                autoCapitalize="none"
              />
              {formikProps.touched.password && formikProps.errors.password ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.password}</Text>
              ) : null}

              <TouchableOpacity>
                <Text style={styles.forgotPassword}>{t('forgot_password')}</Text>
              </TouchableOpacity>

              {(error) && (
                <Text style={{ color: 'red', marginVertical: 8 }}>
                  {typeof error === 'string' ? error : JSON.stringify(error)}
                </Text>
              )}
              
              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.5 }]}
                onPress={() => formikProps.handleSubmit()}
                disabled={loading}
              >
                <Text style={styles.button_title}>{t('login')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </LoginForm>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('dont_have_an_account')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
          <Text style={styles.registerNavigation}>{t('sign_up')}</Text>
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
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 8,
    backgroundColor: COLORS.FORM_INPUT_BG,
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
  registerNavigation: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.TEXT.PRIMARY,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  forgotPassword: {
    color: COLORS.ACCENT,
    fontSize: FONTS.SIZES.SMALL,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 10,
  },
  button: {
    backgroundColor: COLORS.ACCENT,
    padding: 12,
    borderRadius: 5,
  },
  button_title: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
