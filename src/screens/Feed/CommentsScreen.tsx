import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import Container from 'components/layout/Container';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { COLORS, FONTS } from 'utils/constants/ui';
import FullScreenLoader from 'components/common/FullScreenLoader';
import Toast from 'react-native-toast-message';
import { CommentPostRequest, Comments, Comment } from 'types/feed';
import { fetchCommentsByPostId, commentPost, fetchLikesByPostId, deleteComment, editComment } from 'services/api/feedApi';
import { View, TextInput, TouchableOpacity, Alert, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CommentItem from './components/CommentItem';
import PlaneIcon from '@assets/icons/PlaneIcon';
import PlusIcon from '@assets/icons/PlusIcon';
import { Post, LikesList } from 'types/feed';
import { Icon } from '@rneui/themed';
import { BaseItem } from 'components/common/items/BaseItem';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import SelectorModal from './components/SelectorModal';

const Section = styled.View`
  margin-horizontal: 16px;
  padding-bottom: 16px;
  padding-top: 8px;
  flex: 1;
`;

const EmptyText = styled.Text`
  color: #888;
  font-size: ${FONTS.SIZES.MEDIUM}px;
  margin-top: 50%;
  text-align: center;
`;

const CommentInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: ${FONTS.SIZES.MEDIUM}px;
  background-color: ${COLORS.GRAY_BUTTON_BG};
  border-radius: 25px;
  min-height: 40px;
  padding: 12px;
  flex: 1;
`;

const CommentBox = styled.View`
  padding-top: 8px;
  border-top-width: 1px;
  border-top-color: ${COLORS.BORDER};
  bottom: 3%;
  background-color: #fff;
`;

const CommentInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 12px;
  gap: 8px;
`;

const IconCircleWrapper = styled.View`
  background-color: ${COLORS.GRAY_BUTTON_BG};
  padding: 12px;
  border-radius: 50%;
  min-height: 40px;
  min-width: 40px;
`;

const TabBarHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.BORDER};
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

const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 12px;
  padding-bottom: 16px;
`;

type CommentScreenProps = {
  postItem?: Post;
  setCommentModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentsScreen: React.FC<CommentScreenProps> = ({ postItem, setCommentModalVisible }) => {
  const { t } = useTranslation();
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const id = postItem?.id;
  const [commentCount, setCommentCount] = useState<number>(postItem?.commentCount || 0);
  const [commentCreate, setCommentCreate] = useState<CommentPostRequest>({
    postId: String(id),
    content: '',
    parentCommentId: undefined,
  });
  const [comments, setComments] = useState<Comments>([]);
  const [likesList, setLikesList] = useState<LikesList>([]);
  const [selectedComment, setSelectedComment] = useState<Comment | undefined>(undefined);
  const [selectorModalVisible, setSelectorModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'comments' | 'likes'>('comments');
  const [isEditMode, setIsEditMode] = useState(false);
  const [replyTo, setReplyTo] = useState<Comment | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // TabView state
  const [index, setIndex] = useState(0);
  const routes = useMemo(() => [
    { key: 'comments', title: `${commentCount} ${t('comments')}` },
    { key: 'likes', title: `${postItem?.likeCount || 0} ${t('likes')}` },
  ], [commentCount, postItem?.likeCount, t]);

  useEffect(() => {
    const fetchComments = async () => {
      setCommentLoading(true);
      try {
        const response = await fetchCommentsByPostId(String(id));
        if (response.data) {
          setComments(response.data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setCommentLoading(false);
      }
    };

    const fetchLikes = async () => {
      setLikeLoading(true);
      try {
        const response = await fetchLikesByPostId(String(id));
        if (response.data) {
          setLikesList(response.data);
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      } finally {
        setLikeLoading(false);
      }
    };

    fetchComments();
    fetchLikes();
  }, [id]);

  const handleComment = async () => {
    if (isSubmitting) return; // avoid double click
    setIsSubmitting(true);

    if (isEditMode && selectedComment) {
      // Update comment
      try {
        const response = await editComment(selectedComment.id, commentCreate);
        if (response.status === 200) {
          setComments(prev => prev.map(c => c.id === selectedComment.id ? { ...c, content: commentCreate.content } : c));
          setIsEditMode(false);
          setSelectedComment(undefined);
          setCommentCreate(prev => ({ ...prev, content: '', parentCommentId: undefined }));
          setReplyTo(undefined);
        } else {
          Toast.show({ type: 'error', text1: response.message });
        }
      } catch (error) {
        console.error('Error editing comment:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Add new comment
      try {
        const response = await commentPost(commentCreate);
        if (response.status === 200) {
          if(!commentCreate.parentCommentId) {
            setComments(prev => [response.data as Comment, ...prev]);
          }
          else {
            setComments(prev => prev.map(c => {
              if (c.id === commentCreate.parentCommentId) {
                return {
                  ...c,
                  newReplies: c.newReplies ? [response.data as Comment, ...c.newReplies] : [response.data as Comment],
                };
              }
              return c;
            }));
          }
          setCommentCreate(prev => ({ ...prev, content: '', parentCommentId: undefined }));
          setReplyTo(undefined);
          setCommentCount(prev => prev + 1);
        } else {
          Toast.show({
            type: 'error',
            text1: response.message,
          });
        }
      } catch (error) {
        console.error('Error commenting post:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleLongPressComment = useCallback((item: Comment) => {
    setSelectedComment(item);
    setSelectorModalVisible(true);
  }, []);

  const handleCloseSelectorModal = useCallback(() => {
    setSelectorModalVisible(false);
    setSelectedComment(undefined);
  }, []);

  const handleDeleteComment = async () => {
    try {
      const response = await deleteComment(String(selectedComment?.id));
      if (response.status === 200) {
        if (!selectedComment?.parentCommentId) {
          setCommentCount((prev) => prev - 1 - (selectedComment?.repliesCount || 0));
          setComments((prevComments) => prevComments.filter((comment) => comment.id !== selectedComment?.id));
        } else {
          setComments(prev => prev.map(c => {
            if (c.id === selectedComment?.parentCommentId) {
              return {
                ...c,
                newReplies: c.newReplies ? c.newReplies.filter(r => r.id !== selectedComment?.id) : [],
                deletedReplyIds: c.deletedReplyIds ? [...c.deletedReplyIds, String(selectedComment?.id)] : [String(selectedComment?.id)],
              };
            }
            return c;
          }));
          setCommentCount((prev) => prev - 1);
        }
        setSelectedComment(undefined);
      }
      else {
        Toast.show({
          type: 'error',
          text1: response.message,
        });
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const confirmDeleteComment = () => {
    setSelectorModalVisible(false);
    Alert.alert(
      t('delete_comment'),
      t('delete_comment_confirmation'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('delete'), style: 'destructive', onPress: handleDeleteComment },
      ],
    );
  };

  const handleEditComment = () => {
    if (selectedComment) {
      setCommentCreate(prev => ({ ...prev, content: selectedComment.content, parentCommentId: selectedComment.parentCommentId }));
      setIsEditMode(true);
      setSelectorModalVisible(false);
    }
  };

  const handleReply = useCallback((comment: Comment) => {
    setReplyTo(comment);
    setCommentCreate(prev => ({ ...prev, parentCommentId: comment.id, content: '' }));
  }, []);

  const renderScene = useCallback(({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'comments':
        return (
          <Section>
            { comments?.length === 0 ? (
              <EmptyText>{t('no_comments')}</EmptyText>
            ) : (
              <FlatList
                data={comments}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity activeOpacity={0.4} onLongPress={() => handleLongPressComment(item)}>
                    <CommentItem
                      item={item}
                      onReply={handleReply}
                      handleLongPressComment={handleLongPressComment}
                    />
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
              />
            ) }
          </Section>
        );
      case 'likes':
        return (
          <Section>
            { likesList?.length === 0 ? (
                <EmptyText>{t('no_likes')}</EmptyText>
            ) : (
              <FlatList
                data={likesList}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <Row key={item.id} onPress={() => {
                    setCommentModalVisible(false);
                    navigation.navigate('Main', { screen: 'Profile', params: { id: String(item.user.id) } });
                  }}>
                    <BaseItem
                      imageContent={item.user.avatar}
                      rowTitle={item.user.fullName}
                      rowSubtitle={item.user.username}
                    />
                    <ArrowIcon />
                  </Row>
                )}
                showsVerticalScrollIndicator={false}
              />
            ) }
          </Section>
        );
      default:
        return null;
    }
  }, [comments, likesList, t, handleLongPressComment, handleReply, setCommentModalVisible, navigation]);

  if (commentLoading || likeLoading) return <View style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, flex: 1 }}><FullScreenLoader /></View>;

  return (
    <Container>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={index => {
          setIndex(index);
          setViewMode(index === 0 ? 'comments' : 'likes');
        }}
        renderTabBar={props => (
          <TabBarHeader>
            <TabBar
              {...props}
              style={{ width: 250, alignSelf: 'center', backgroundColor: 'transparent' }}
              indicatorStyle={{ backgroundColor: COLORS.ACCENT }}
              activeColor='black'
              inactiveColor='black'
            />
            <TouchableOpacity onPress={() => setCommentModalVisible(false)} style={{ paddingHorizontal: 16 }}>
              <Icon
                name="x"
                type="feather"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </TabBarHeader>
        )}
      />

      {viewMode === 'comments' && (
        <>
        <CommentBox>
          {(isEditMode && selectedComment) ? (
            <TitleBox>
              <Text style={{ color: '#888' }}>
                {t('edit_comment')}
              </Text>
              <TouchableOpacity onPress={() => {
                setIsEditMode(false);
                setSelectedComment(undefined);
                setCommentCreate(prev => ({ ...prev, content: '', parentCommentId: undefined }));
                setReplyTo(undefined);
              }}>
                <Icon name="x" type="feather" size={20} color="#888" />
              </TouchableOpacity>
            </TitleBox>
          ) : replyTo ? (
            <TitleBox>
              <Text numberOfLines={1} style={{ color: '#888' }}>{replyTo.user.fullName}: {replyTo.content}</Text>
              <TouchableOpacity onPress={() => {
                setReplyTo(undefined);
                setCommentCreate(prev => ({ ...prev, parentCommentId: undefined, content: '' }));
              }}>
                <Icon name="x" type="feather" size={20} color="#888" />
              </TouchableOpacity>
            </TitleBox>
          ) : null}

          <CommentInputContainer>
            <IconCircleWrapper>
              <PlusIcon />
            </IconCircleWrapper>
            <CommentInputWrapper>
              <TextInput
                placeholder={isEditMode ? t('edit_comment') : (replyTo ? t('reply_comment') : t('write_a_comment'))}
                style={{ fontSize: FONTS.SIZES.MEDIUM, flex: 1, padding: 0, margin: 0 }}
                multiline
                value={commentCreate.content}
                onChangeText={(text) => setCommentCreate(prev => ({ ...prev, content: text }))}
                placeholderTextColor="#888"
                autoCapitalize="none"
              />
              {commentCreate.content.trim().length === 0 ? null : (
                <TouchableOpacity onPress={handleComment}>
                  <PlaneIcon />
                </TouchableOpacity>
              )}
            </CommentInputWrapper>
          </CommentInputContainer>
        </CommentBox>
        </>
      )}

      <SelectorModal
        modalVisible={selectorModalVisible}
        onCloseModal={handleCloseSelectorModal}
        onEdit={handleEditComment}
        onDelete={confirmDeleteComment}
        type='comment'
      />
    </Container>
  );
};

export default CommentsScreen;
