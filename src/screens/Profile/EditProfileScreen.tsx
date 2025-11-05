import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'components/layout/Container';
import Header from 'components/common/Header';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import {
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Avatar from 'components/common/Avatar';
import { FormikForm } from 'components/common/formik/FormikForm';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserProfile } from '../../store/slices/userSlice';
import { COLORS, FONTS } from '../../utils/constants';
import Toast from 'react-native-toast-message';

const Section = styled.View`
  margin: 16px;
`;
const AvatarContainer = styled.View`
  align-items: center;
  margin-top: 24px;
  margin-bottom: 48px;
`;
const AvatarLabel = styled.Text`
  margin-top: 10px;
  font-size: ${FONTS.SIZES.MEDIUM}px;
  font-weight: bold;
  text-align: center;
`;
const StyledInput = styled.TextInput`
  background: ${COLORS.FORM_INPUT_BG};
  border-color: ${COLORS.BORDER};
  border-width: 1px;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 14px;
  font-size: ${FONTS.SIZES.LARGE}px;
`;

const EditProfile: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);

  const initialValues = {
    fullName: profile?.fullName || '',
    email: profile?.email || '',
    username: profile?.username || '',
    phoneNumber: profile?.phoneNumber || '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required(t('full_name_required')),
    username: Yup.string().required(t('username_required')),
    email: Yup.string().email(t('email_invalid')).required(t('email_required')),
    phoneNumber: Yup.string()
      .matches(/^0\d{9}$/, t('phone_number_invalid'))
      .required(t('phone_number_required')),
  });

  const onSubmit = async (values: any, formikHelpers: any) => {
    try {
      if (profile?.id) {
        const result = await dispatch(
          updateUserProfile({ id: profile.id, profileData: values })
        );
        if (updateUserProfile.fulfilled.match(result)) {
          // Get updated profile from result and reset form
          const updatedProfile = result.payload;
          formikHelpers.resetForm({
            values: {
              fullName: updatedProfile.fullName || '',
              email: updatedProfile.email || '',
              username: updatedProfile.username || '',
              phoneNumber: updatedProfile.phoneNumber || '',
            },
          });

          Toast.show({
            type: 'success',
            text1: result.payload.message,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: typeof result.payload === 'string' ? result.payload : JSON.stringify(result.payload),
          });
        }
      }
    } catch (e) {
      console.error('Error updating profile:', e);
    }
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formikProps => (
        <Container>
          <Header
            leftIcon={[
              <Icon
                key="arrow"
                name="arrow-left"
                type="feather"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
              />,
            ]}
            leftTitle={t('edit_profile')}
            rightIcons={
              formikProps.dirty
                ? [
                    <TouchableOpacity
                      key="done"
                      onPress={() => formikProps.handleSubmit()}
                    >
                      <Icon name="check" type="feather" size={24} />
                    </TouchableOpacity>,
                  ]
                : []
            }
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
          >
            <Section>
              <AvatarContainer>
                <Avatar size={90} uri={profile?.avatar} />
                <AvatarLabel>{t('change_profile_picture')}</AvatarLabel>
              </AvatarContainer>
              <StyledInput
                placeholder="Full Name"
                value={formikProps.values.fullName}
                onChangeText={formikProps.handleChange('fullName')}
                onBlur={formikProps.handleBlur('fullName')}
                editable={!formikProps.isSubmitting}
              />
              <StyledInput
                placeholder="Username"
                value={formikProps.values.username}
                onChangeText={formikProps.handleChange('username')}
                onBlur={formikProps.handleBlur('username')}
                editable={!formikProps.isSubmitting}
                autoCapitalize="none"
              />
              <StyledInput
                placeholder="Email"
                value={formikProps.values.email}
                onChangeText={formikProps.handleChange('email')}
                onBlur={formikProps.handleBlur('email')}
                editable={!formikProps.isSubmitting}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <StyledInput
                placeholder="Phone number"
                value={formikProps.values.phoneNumber}
                onChangeText={formikProps.handleChange('phoneNumber')}
                onBlur={formikProps.handleBlur('phoneNumber')}
                editable={!formikProps.isSubmitting}
                keyboardType="phone-pad"
              />
              {/* Show error message if exists */}
              {Object.keys(formikProps.errors).length > 0 &&
                formikProps.submitCount > 0 && (
                  <Text style={{ color: 'red', marginTop: 8 }}>
                    {Object.values(formikProps.errors)[0] as string}
                  </Text>
                )}
            </Section>
          </KeyboardAvoidingView>
        </Container>
      )}
    </FormikForm>
  );
};

export default EditProfile;
