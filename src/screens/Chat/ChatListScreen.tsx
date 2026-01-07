import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Container from 'components/layout/Container';
import { BaseItem } from 'components/common/items/BaseItem';
import { FONTS } from '../../utils/constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';
import FriendSearchBar from 'components/common/FriendSearchBar';
import FullScreenLoader from 'components/common/FullScreenLoader';
import { SearchFriendResponse } from '../../types/friends';
import { Icon } from '@rneui/themed';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { getRoomsList, getDirectChatRoom } from 'services/api/chatApi';
import { getFriendsList } from 'services/api/friendsApi';
import { Rooms } from '../../types/chat';
import { FriendsListResponse } from '../../types/friends';
import Avatar from 'components/common/Avatar';
import { useAppSelector } from '../../hooks/redux';

const EmptyText = styled.Text`
  color: #888;
  font-size: ${FONTS.SIZES.MEDIUM}px;
  margin-top: 50%;
  text-align: center;
`;

const Section = styled.View`
  margin: 16px;
`;

const SectionTitle = styled.Text`
  font-size: ${FONTS.SIZES.LARGE}px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const NameText = styled.Text`
  font-size: ${FONTS.SIZES.MEDIUM}px;
  font-weight: 500;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

const ArrowIcon = styled(Icon).attrs({
  name: 'chevron-right',
  type: 'feather',
  size: 22,
  color: '#bbb',
})``;

const ChatList: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [friendSearch, setFriendSearch] = useState<SearchFriendResponse | null>(null);
  const [loadingRoomsList, setLoadingRoomsList] = useState(false);
  const [loadingFriendsList, setLoadingFriendsList] = useState(false);
  const [roomsList, setRoomsList] = useState<Rooms>([]);
  const [friendsList, setFriendsList] = useState<FriendsListResponse | null>(null);
  const ownProfile = useAppSelector((state) => state.user.profile);

  const handleGetRoomsList = async () => {
    setLoadingRoomsList(true);
    try {
      const response = await getRoomsList();

      if (response.data) {
        setRoomsList(response.data);
      }
    } catch (error) {
      console.error('Error getting rooms list:', error);
    } finally {
      setLoadingRoomsList(false);
    }
  };

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

  const handleStartChat = async (userId1?: number, userId2?: number, roomId?: string) => {
    let finalRoomId = roomId;
    if (userId1 && userId2) {
      try {
        const response = await getDirectChatRoom({ userId1, userId2 });
        if (response.data) {
          finalRoomId = response.data.id;
        }

      } catch (error) {
        console.error('Error getting direct chat room:', error);
      }
    }

    if (!finalRoomId) return;

    navigation.navigate('ChatDetail', {
      id: String(finalRoomId),
    });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetRoomsList();
      handleGetFriendsList();
    }, [])
  );

  if (loadingRoomsList || loadingFriendsList) return <FullScreenLoader />;

  return (
    <Container>
      <View style={{ marginTop: '10%' }}>
        <FriendSearchBar
          value={search}
          setSearch={setSearch}
          setFriendSearch={setFriendSearch}
          type="search-friends"
        />
      </View>

      <Section>
        {friendSearch && (
          <Row
            key={friendSearch.id}
            onPress={() => handleStartChat(ownProfile!.id, friendSearch.id)}
          >
            <BaseItem
              imageContent={friendSearch.avatar}
              rowTitle={friendSearch.fullName}
              rowSubtitle={friendSearch.username}
            />
            <ArrowIcon />
          </Row>
        )}

        {friendsList && friendsList.length > 0 && (
          <FlatList
            data={friendsList}
            horizontal
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ alignItems: 'center', gap: 8, marginRight: 16 }} onPress={() => handleStartChat(ownProfile!.id, item.id)}>
                <Avatar uri={item.avatar} />
                <NameText>{item.fullName}</NameText>
              </TouchableOpacity>
            )}
          />
        )}
      </Section>

      <Section>
        <SectionTitle>{t('messages')}</SectionTitle>
        {roomsList && roomsList.length > 0 ? (
          <FlatList
            data={roomsList}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ height: "100%" }}
            renderItem={({ item }) => {
              const otherMember = item.members?.find((m: any) => m.id !== ownProfile?.id);
              return (
                <Row key={item.id} onPress={() => handleStartChat(undefined, undefined, item.id)}>
                  <BaseItem
                    imageContent={otherMember?.avatar || item.avatar}
                    rowTitle={otherMember?.fullName || item.name}
                    rowSubtitle='online'
                  />
                </Row>
              );
            }}
          />
        ) : (
          <EmptyText>{t('no_messages')}</EmptyText>
        )
        }

      </Section>      
    </Container>
  );
};

export default ChatList;
