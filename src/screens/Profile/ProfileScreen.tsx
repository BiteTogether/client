import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'utils/i18n';
import Container from 'components/layout/Container';
import Header from 'components/common/Header';
import Avatar from 'components/common/Avatar';
import styled from 'styled-components/native';
import { COLORS, FONTS } from 'utils/constants/ui';
import ProfileImageGrid from './components/ProfileImageGrid';
import { TouchableOpacity, Text } from 'react-native';
import { useAppDispatch } from 'hooks/redux';
import { logoutUser } from 'store/slices/authSlice';

const UserContainer = styled.View`
  padding: 16px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const UserDetails = styled.View`
  flex-direction: column;
  margin-left: 8px;
  gap: 8px;
`;

const UserName = styled.Text`
  color: ${COLORS.TEXT.PRIMARY};
  font-weight: ${FONTS.WEIGHTS.SEMIBOLD};
  font-size: ${FONTS.SIZES.XLARGE}px;
`;

const UserBio = styled.Text`
  margin-top: 8px;
`;

const UserMeta = styled.View`
  flex-direction: row;
  gap: 40px;
`;

const MetaItem = styled.View``;

const MetaNumber = styled.Text`
  font-weight: ${FONTS.WEIGHTS.SEMIBOLD};
`;

const MetaLabel = styled.Text`
  color: ${COLORS.TEXT.LIGHT};
  font-weight: ${FONTS.WEIGHTS.REGULAR};
`;

const GridMedia = styled.View``;

const Profile: React.FC = () => {
  const { i18n: i18nextInstance } = useTranslation();
  const dispatch = useAppDispatch();
  const handleChangeLang = () => {
    const nextLang = i18nextInstance.language === 'en' ? 'vi' : 'en';
    i18nextInstance.changeLanguage(nextLang);
  };
  const { t } = useTranslation();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <Container>
      <Header />
      <UserContainer>
        <UserInfo>
          <Avatar size="large" />
          <UserDetails>
            <UserName>John Doe</UserName>
            <UserMeta>
              <MetaItem>
                <MetaNumber>108</MetaNumber>
                <MetaLabel>{t('posts')}</MetaLabel>
              </MetaItem>
              <MetaItem>
                <MetaNumber>10.5K</MetaNumber>
                <MetaLabel>{t('likes')}</MetaLabel>
              </MetaItem>
              <MetaItem>
                <MetaNumber>20</MetaNumber>
                <MetaLabel>{t('liked_brands')}</MetaLabel>
              </MetaItem>
            </UserMeta>
          </UserDetails>
        </UserInfo>

        <UserBio>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </UserBio>
      </UserContainer>

      <GridMedia>
        <ProfileImageGrid />
      </GridMedia>

      <TouchableOpacity onPress={handleChangeLang}>
        <Text>Lang</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={{marginTop: 16, backgroundColor: '#FF6B35', padding: 12, borderRadius: 8, alignItems: 'center'}}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>{t('logout')}</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Profile;
