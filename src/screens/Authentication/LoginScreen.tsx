import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { LoginForm } from '../../components/authentication/LoginForm';
import * as Yup from 'yup';
import { Button } from 'react-native';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const initialValues = { email: '', password: '' };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
  const onSubmit = (values: any) => { console.log(values); };
  
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
                {...formikProps.getFieldProps("email")} />
              {formikProps.touched.email && formikProps.errors.email ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.email}</Text>
              ) : null}

              <TextInput 
                style={styles.input}
                placeholder='Password'
                secureTextEntry
                {...formikProps.getFieldProps("password")} />
              {formikProps.touched.password && formikProps.errors.password ? (
                <Text style={{ color: 'red' }}>{formikProps.errors.password}</Text>
              ) : null}

              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              <Button title='Login' color={COLORS.ACCENT}/>
            </View>
          )}
        </LoginForm>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
          <Text style={styles.registerNavigation}>Sign Up.</Text>
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
    marginVertical: 8,
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
});

export default LoginScreen;
