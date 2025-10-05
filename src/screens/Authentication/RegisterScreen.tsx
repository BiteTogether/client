import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as Yup from 'yup';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button } from 'react-native';

import { COLORS, FONTS } from '../../utils/constants';
import { RegisterForm } from './components/RegisterForm';


const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const validationSchema = Yup.object({
      
    });
  const onSubmit = (values: any) => { };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../../assets/app_logo.png')} 
          style={styles.appLogo}
        />
        <Text style={styles.appName}>BiteTogether</Text>
      </View>

      <View style={styles.content}>
        <RegisterForm
          initialValues={{ email: '', password: '', confirmPassword: '', username: '', fullName: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => { onSubmit(values); }}
        >
          {(formikProps) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder='Full Name'
                {...formikProps.getFieldProps('fullName')} />
              {formikProps.touched.fullName && formikProps.errors.fullName ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.fullName}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder='Username'
                {...formikProps.getFieldProps('username')} />
              {formikProps.touched.username && formikProps.errors.username ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.username}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder='Email'
                keyboardType='email-address'
                {...formikProps.getFieldProps('email')} />
              {formikProps.touched.email && formikProps.errors.email ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.email}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry
                {...formikProps.getFieldProps('password')} />
              {formikProps.touched.password && formikProps.errors.password ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.password}</Text>
              ) : null}
              
              <TextInput
                style={styles.input}
                placeholder='Confirm Password'
                secureTextEntry
                {...formikProps.getFieldProps('confirmPassword')} />
              {formikProps.touched.confirmPassword && formikProps.errors.confirmPassword ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.confirmPassword}</Text>
              ) : null}

              <TouchableOpacity style={styles.registerButton}>
                <Button title='Sign up' color={COLORS.ACCENT}/>
              </TouchableOpacity>
            </View>
          )}
        </RegisterForm>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
          <Text style={styles.registerNavigation}>Login.</Text>
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
  registerButton: {
    marginTop: 15,
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
});

export default RegisterScreen;
