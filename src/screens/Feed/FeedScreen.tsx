import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { FONTS } from 'utils/constants/ui';
import Header from '../../components/common/Header';
import PostItem from './components/PostItem';
import FullScreenLoader from 'components/common/FullScreenLoader';
import SearchIcon from '@assets/icons/SearchIcon';
import NotiIcon from '@assets/icons/NotiIcon';
import CreatePostIcon from '@assets/icons/CreatePostIcon';
import Container from 'components/layout/Container';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { deletePost } from 'services/api/feedApi';
import { useFetchPosts } from './hooks/useFetchPosts';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import SelectorModal from './components/SelectorModal';
import CommentModal from './components/CommentModal';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { Icon } from "@rneui/themed"
import { useAppSelector } from '../../hooks/redux';
import { Post } from 'types/feed';

const EmptyText = styled.Text`
  color: #888;
  font-size: ${FONTS.SIZES.MEDIUM}px;
  margin-top: 50%;
  text-align: center;
`;

const Feed: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { id } = (route.params ?? {}) as { id?: string };
  const { posts, loading, handleFetchPosts, setPosts } = useFetchPosts();
  const [selectorModalVisible, setSelectorModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const { t } = useTranslation();
  
  const ownProfile = useAppSelector((state) => state.user.profile);
  
  const handleOpenCreatePost = () => {
    navigation.navigate('CreatePost');
  };

  const handleCloseSelectorModal = () => {
    setSelectorModalVisible(false);
  };

  const handleCloseCommentModal = () => {
    setCommentModalVisible(false);
  };

  const handleEditPost = () => {
    navigation.navigate('EditPost', { id: String(selectedPost?.id) });
    setSelectorModalVisible(false);
  };

  const handleDeletePost = async () => {
    try {
      const response = await deletePost(String(selectedPost?.id));
      
      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== selectedPost?.id));
        Toast.show({
          type: 'success',
          text1: response.message,
        });
      }
      else {
        Toast.show({
          type: 'error',
          text1: response.message,
        });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const confirmDeletePost = () => {
    setSelectorModalVisible(false);
    Alert.alert(
      t('delete_post'),
      t('delete_post_confirmation'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('delete'), style: 'destructive', onPress: handleDeletePost },
      ],
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (id) {
        handleFetchPosts(Number(id));
      } else {
        handleFetchPosts();
      }
    }, [id, ownProfile?.id])
  );

  if (loading) return <FullScreenLoader />;

  return (
    <Container>
      <Header
        rightIcons={[<CreatePostIcon />, <SearchIcon />, <NotiIcon />]}
        onRightPress={[handleOpenCreatePost]}
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
        onLeftPress={() => navigation.navigate('Main', { screen: 'Profile' })}
        leftTitle={id ? t('posts') : undefined}
      />

      { posts?.length === 0 ? (
        <EmptyText>{t('no_posts')}</EmptyText>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <PostItem item={item} setSelectorModalVisible={setSelectorModalVisible} setCommentModalVisible={setCommentModalVisible} setSelectedPost={setSelectedPost} />}
          showsVerticalScrollIndicator={false}
        />
      ) }

      <SelectorModal
        modalVisible={selectorModalVisible}
        onCloseModal={handleCloseSelectorModal}
        onEditPost={handleEditPost}
        onDeletePost={confirmDeletePost}
      />

      <CommentModal
        modalVisible={commentModalVisible}
        onCloseModal={handleCloseCommentModal}
        setCommentModalVisible={setCommentModalVisible}
        postItem={selectedPost}
      />
    </Container>
  );
};

export default Feed;
