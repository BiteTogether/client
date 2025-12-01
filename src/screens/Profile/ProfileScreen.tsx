import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchPosts } from '../Feed/hooks/useFetchPosts';
import Container from 'components/layout/Container';
import Header from 'components/common/Header';
import Avatar from 'components/common/Avatar';
import styled from 'styled-components/native';
import { COLORS, FONTS } from 'utils/constants/ui';
import ProfileImageGrid from './components/ProfileImageGrid';
import ProfileAction from './components/ProfileAction';
import { Icon } from "@rneui/themed"
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setViewingProfile } from '../../store/slices/userSlice';
import { fetchFriendProfile, addFriend, rejectFriendRequest, removeFriend } from 'services/api/friendsApi';
import { Alert } from 'react-native';
import FullScreenLoader from 'components/common/FullScreenLoader';

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
  const route = useRoute();
  const { id } = (route.params ?? {}) as { id?: string };
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { posts, loading: postsLoading, handleFetchPosts } = useFetchPosts();
  const [loading, setLoading] = useState(false);
  const ownProfile = useAppSelector((state) => state.user.profile);
  const viewingProfile = useAppSelector((state) => state.user.viewingProfile);
  
  const currentProfile = viewingProfile || ownProfile;

  const handleAddFriend = async () => {
    try {
      if (id && id !== String(ownProfile?.id)) {
        const response = await addFriend(Number(id));
        if (response.status === 200) {
          dispatch(setViewingProfile({
            ...currentProfile,
            friendItem: {
              hasFriendRequestSent: true,
              friendRequestId: response.data,
            }
          }));
        }
      }

    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  const confirmRejectFriendRequest = () => {
    Alert.alert(
      currentProfile.friendItem?.isFriend ? t('remove_friend') : t('remove_friend_request'),
      currentProfile.friendItem?.isFriend ? t('remove_friend_confirmation') : t('remove_friend_request_confirmation'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('remove'), style: 'destructive', onPress: handleRejectFriendRequest },
      ],
    );
  };

  const handleRejectFriendRequest = async () => {
    try {
      if (id && id !== String(ownProfile?.id)) {
        let response;
        if(currentProfile.friendItem?.isFriend) {
          response = await removeFriend(Number(id));
          if (response.status === 200) {
            dispatch(setViewingProfile({
              ...currentProfile,
              friendItem: {
                isFriend: false,
              }
            }));
          }
        } else {
          response = await rejectFriendRequest(Number(currentProfile.friendItem?.friendRequestId));
          if (response.status === 200) {
            dispatch(setViewingProfile({
              ...currentProfile,
              friendItem: {
                hasFriendRequestSent: false,
              }
            }));
          }
        }
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        setLoading(true);
        try {
          if (id && id !== String(ownProfile?.id)) {
            const response = await fetchFriendProfile(Number(id));
            if (response.data) {
              dispatch(setViewingProfile(response.data));
            }
          } else {
            dispatch(setViewingProfile(ownProfile));
          }
        } catch (error) {
          console.error('Error fetching friend profile:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchProfile();
      
      if (id && id !== String(ownProfile?.id)) {
        handleFetchPosts(Number(id));
      } else {
        handleFetchPosts(Number(ownProfile?.id));
      }
    }, [id, ownProfile, dispatch])
  );

  if (loading || postsLoading) return <FullScreenLoader />;
  return (
    <Container>
      <Header
        rightIcons={[
          id ? null : (
          <Icon 
            name="settings"
            type="feather"
            size={24}
            color="black"
          />
          ),
        ]}
        onRightPress={[() => navigation.navigate('Settings')]}

        leftIcon={
          !id ? null : (
          <Icon
            name="arrow-left"
            type="feather"
            size={24}
            color="black"
          />
          )
        }
        onLeftPress={() => navigation.goBack()}

        leftTitle={currentProfile.username}
      />
      <UserContainer>
        <UserInfo>
          <Avatar size="large" uri={currentProfile?.avatar} />
          <UserDetails>
            <UserName>{currentProfile?.fullName}</UserName>
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
          {currentProfile?.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
        </UserBio>
        <ProfileAction
          type={String(currentProfile.id) !== String(ownProfile?.id) ? 'user' : 'self'}
          isFriend={currentProfile.friendItem?.isFriend}
          hasFriendRequestSent={currentProfile.friendItem?.hasFriendRequestSent}
          onEdit={() => navigation.navigate('EditProfile')}
          onFriends={() => navigation.navigate('Friends')}
          onAddFriend={handleAddFriend}
          onRejectFriendRequest={confirmRejectFriendRequest}
        />
      </UserContainer>

      <GridMedia>
        <ProfileImageGrid data={posts} />
      </GridMedia>
    </Container>
  );
};

export default Profile;
