import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'components/layout/Container';
import Header from 'components/common/Header';
import Avatar from 'components/common/Avatar';
import styled from 'styled-components/native';
import { COLORS, FONTS } from 'utils/constants/ui';
import ProfileImageGrid from './components/ProfileImageGrid';
import ProfileAction from './components/ProfileAction';
import { Icon } from "@rneui/themed"
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { useAppSelector } from '../../hooks/redux';

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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const profile = useAppSelector((state) => state.user.profile);
  return (
    <Container>
      <Header
        rightIcons={[
          <Icon 
            name="settings"
            type="feather"
            size={24}
            color="black"
            onPress={() => navigation.navigate('Settings')}
          />
        ]}
      />
      <UserContainer>
        <UserInfo>
          <Avatar size="large" />
          <UserDetails>
            <UserName>{profile?.fullName}</UserName>
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
    <ProfileAction type="self" onEdit={() => navigation.navigate('EditProfile')} />
      </UserContainer>

      <GridMedia>
        <ProfileImageGrid />
      </GridMedia>
    </Container>
  );
};

export default Profile;
