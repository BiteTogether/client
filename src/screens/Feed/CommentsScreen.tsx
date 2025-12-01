import React, { useState, useEffect } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Container from 'components/layout/Container';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { COLORS, FONTS } from 'utils/constants/ui';
import FullScreenLoader from 'components/common/FullScreenLoader';
import Toast from 'react-native-toast-message';
import { CommentPostRequest, Comments, Comment } from 'types/feed';
import { fetchCommentsByPostId, commentPost, fetchLikesByPostId } from 'services/api/feedApi';
import { View, TextInput, TouchableOpacity } from 'react-native';
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

const Section = styled.View`
  margin-horizontal: 16px;
  padding-bottom: 16px;
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

const CommentInputContainer = styled.View`
  padding-top: 8px;
  border-top-width: 1px;
  border-top-color: ${COLORS.BORDER};
  bottom: 3%;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 12px;
  gap: 8px;
  background-color: #fff;
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
  });
  const [comments, setComments] = useState<Comments>([]);
  const [likesList, setLikesList] = useState<LikesList>([]);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // TabView state
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'comments', title: `${commentCount} ${t('comments')}` },
    { key: 'likes', title: `${postItem?.likeCount || 0} ${t('likes')}` },
  ]);

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
    try {
      const response = await commentPost(commentCreate);
      setCommentCreate(prev => ({ ...prev, content: '' }));
      if (response.status === 200) {
        setComments(prev => [response.data as Comment, ...prev]);
        setCommentCount(prev => prev + 1);
      } else {
        Toast.show({
          type: 'error',
          text1: response.message,
        });
      }
    } catch (error) {
      console.error('Error commenting post:', error);
    }
  };

  if (commentLoading || likeLoading) return <View style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, flex: 1 }}><FullScreenLoader /></View>;

  // Tab scenes
  const renderComments = () => (
    <>
      <Section>
        { comments?.length === 0 ? (
          <EmptyText>{t('no_comments')}</EmptyText>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <CommentItem item={item} />}
            showsVerticalScrollIndicator={false}
          />
        ) }
      </Section>
      <CommentInputContainer>
        <IconCircleWrapper>
          <PlusIcon />
        </IconCircleWrapper>
        <CommentInputWrapper>
          <TextInput
            placeholder={t('write_a_comment')}
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
    </>
  );

  const renderLikes = () => (
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

  const renderScene = SceneMap({
    comments: renderComments,
    likes: renderLikes,
  });

  return (
    <Container>
      <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
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
    </Container>
  );
};

export default CommentsScreen;
