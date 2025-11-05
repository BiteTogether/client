import React, { useState, useEffect } from 'react';
import { BaseItem } from 'components/common/items/BaseItem';
import FriendSearchBar from 'components/common/FriendSearchBar';
import Container from 'components/layout/Container';
import Header from 'components/common/Header';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { Icon } from '@rneui/themed';
import { COLORS, FONTS } from '../../utils/constants';
import { t } from 'i18next';
// import Toast from 'react-native-toast-message';
import { getFriendsList, getFriendRequests, acceptFriendRequest, rejectFriendRequest } from 'services/api/friendsApi'; 
import { FriendsListResponse, SearchFriendResponse, FriendRequestsResponse } from '../../types/friends';
import { Alert, TouchableOpacity } from 'react-native';
import FullScreenLoader from 'components/common/FullScreenLoader';

const Section = styled.View`
  margin: 16px;
`;

const SectionTitle = styled.Text`
  font-size: ${FONTS.SIZES.MEDIUM}px;
  font-weight: 600;
  color: #888;
  margin-bottom: 10px;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
  background-color: #fff;
`;

const RowText = styled.View`
  flex: 1;
`;

const RowTitle = styled.Text`
  font-size: ${FONTS.SIZES.LARGE}px;
  font-weight: ${FONTS.WEIGHTS.SEMIBOLD};
`;

const RowSubtitle = styled.Text`
  font-size: ${FONTS.SIZES.SMALL}px;
  color: ${COLORS.TEXT.LIGHT};
  margin-top: 4px;
`;

const ArrowIcon = styled(Icon).attrs({
  name: 'chevron-right',
  type: 'feather',
  size: 22,
  color: '#bbb',
})``;

const RejectIcon = styled(Icon).attrs({
  name: 'x',
  type: 'feather',
  size: 22,
  color: '#bbb',
  marginLeft: 10,
})``;

const EmptyText = styled.Text`
  color: #888;
  font-size: ${FONTS.SIZES.MEDIUM}px;
  padding-vertical: 8px;
  text-align: center;
`;

const AcceptButton = styled.TouchableOpacity`
  background-color: ${COLORS.ACCENT};
  border-radius: 8px;
  padding: 6px 12px;
  margin-left: 8px;
`;

const AcceptButtonText = styled.Text`
  font-weight: bold;
  font-size: ${FONTS.SIZES.SMALL}px;
`;

const Friends: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [search, setSearch] = useState('');
  const [friendSearch, setFriendSearch] = useState<SearchFriendResponse | null>(null);
  const [friendsList, setFriendsList] = useState<FriendsListResponse | null>(null);
  const [friendRequests, setFriendRequests] = useState<FriendRequestsResponse | null>(null);
  const [loadingFriendsList, setLoadingFriendsList] = useState(false);
  const [loadingFriendRequests, setLoadingFriendRequests] = useState(false);

  const filteredFriends = friendsList?.filter(f =>
    f.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const handleGetFriendsList = async () => {
    setLoadingFriendsList(true);
    try {
      const response = await getFriendsList();
      if (response.data) {
        setFriendsList(response.data);
      }
    } catch (error) {
      console.error('Error getting friends list:', error);
    } finally {
      setLoadingFriendsList(false);
    }
  };

  const handleGetFriendsRequest = async () => {
    setLoadingFriendRequests(true);
    try {
      const response = await getFriendRequests();
      if (response.data) {
        setFriendRequests(response.data);
      }
    } catch (error) {
      console.error('Error getting friends requests:', error);
    } finally {
      setLoadingFriendRequests(false);
    }
  };

  const confirmRejectFriendRequest = (id: string) => {
      Alert.alert(
        t('reject_friend_request'),
        t('reject_friend_request_confirmation'),
        [
          { text: t('cancel'), style: 'cancel' },
          { text: t('reject'), style: 'destructive', onPress: () => handleRejectFriendRequest(id) },
        ],
      );
    };

    const handleRejectFriendRequest = async (id: string) => {
      try {
        await rejectFriendRequest(Number(id));
        // Update the local state to remove the rejected request
        setFriendRequests(prevRequests => prevRequests?.filter(request => String(request.id) !== id) || null);
      } catch (e) {
        console.error('Error rejecting friend request:', e);
      }
    };

    const handleAcceptFriendRequest = async (id: string) => {
      try {
        await acceptFriendRequest(Number(id));
        
        // Remove from friend requests
        setFriendRequests(prevRequests => 
          prevRequests?.filter(request => String(request.id) !== id) || null
        );
        
        // Add to friends list (optimistic update)
        const acceptedRequest = friendRequests?.find(req => String(req.id) === id);
        if (acceptedRequest) {
          setFriendsList(prevFriends => 
            prevFriends ? [...prevFriends, acceptedRequest.user] : [acceptedRequest.user]
          );
        }
        
      } catch (e) {
        console.error('Error accepting friend request:', e);
        // Could implement rollback logic here if needed
      }
    }

  useEffect(() => {
    handleGetFriendsList();
    handleGetFriendsRequest();
  }, []);

  if (loadingFriendsList || loadingFriendRequests) return <FullScreenLoader />;

  return (
    <Container>
      <Header
        leftIcon={[ 
          <Icon
            key="arrow"
            name="arrow-left"
            type="feather"
            size={24}
            color="black"
          />,
        ]}
        onLeftPress={() => navigation.navigate('Main', { screen: 'Profile' })}
        leftTitle={t('friends')}
      />

      <FriendSearchBar value={search} setSearch={setSearch} setFriendSearch={setFriendSearch} type="search-friends" />

      <Section>
        {friendSearch && (
          <Row key={friendSearch.id} onPress={() => navigation.navigate('Main', { screen: 'Profile', params: { id: String(friendSearch.id) } })}>
            <BaseItem
              imageContent={friendSearch.avatar}
              textContent={
                <RowText>
                  <RowTitle>{friendSearch.fullName}</RowTitle>
                  <RowSubtitle>{friendSearch.username}</RowSubtitle>
                </RowText>
              }
            />
            <ArrowIcon />
          </Row>
        )}
      </Section>

      <Section>
        <SectionTitle>{t('friends_requests')}</SectionTitle>
        {friendRequests?.length === 0 ? (
          <EmptyText>{t('no_friend_requests')}</EmptyText>
        ) : (
          friendRequests?.map(item => (
            <Row key={item.id} onPress={() => navigation.navigate('Main', { screen: 'Profile', params: { id: String(item.user.id) } })}>
              <BaseItem
                imageContent={item.user.avatar}
                textContent={
                  <RowText>
                    <RowTitle>{item.user.fullName}</RowTitle>
                    <RowSubtitle>{t('pending_confirmation')}</RowSubtitle>
                  </RowText>
                }
              />
              <AcceptButton onPress={() => handleAcceptFriendRequest(String(item.id))}>
                <AcceptButtonText>{t('accept')}</AcceptButtonText>
              </AcceptButton>
              <TouchableOpacity onPress={() => confirmRejectFriendRequest(String(item.id))}>
                <RejectIcon />
              </TouchableOpacity>
            </Row>
          ))
        )}
      </Section>

      <Section>
        <SectionTitle>{t('friends_list')}</SectionTitle>
        {filteredFriends?.length === 0 ? (
          <EmptyText>{t('no_friends')}</EmptyText>
        ) : (
          filteredFriends?.map(item => (
            <Row key={item.id} onPress={() => navigation.navigate('Main', { screen: 'Profile', params: { id: String(item.id) } })}>
              <BaseItem
                imageContent={item.avatar}
                textContent={
                  <RowText>
                    <RowTitle>{item.fullName}</RowTitle>
                    <RowSubtitle>{item.username}</RowSubtitle>
                  </RowText>
                }
              />
              <ArrowIcon />
            </Row>
          ))
        )}
      </Section>
    </Container>
  );
};

export default Friends;
