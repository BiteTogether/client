import React, { useState, useMemo, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';
import HeartIcon from '@assets/icons/HeartIcon';
import { TouchableOpacity, Text } from 'react-native';
import { Comment, Comments } from 'types/feed';
import BaseItem from 'components/common/items/BaseItem';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'utils/helpers/formatting';
import debounce from 'lodash.debounce';
import { likePost, unlikePost, fetchRepliesByCommentId } from 'services/api/feedApi';
import { FlatList } from 'react-native-gesture-handler';

const CommentContainer = styled.View`
  margin: 8px 0;
`;

const CommentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CommentImageSection = styled.View`
  flex-direction: column;
  padding-left: 60px;
  padding-right: 10px;
`;

const ActionBar = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 30px;
`;

const ActionButtonWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const TimeText = styled.Text`
  color: #bbb;
`;

const ReplyText = styled.Text`
  color: #888;
  font-weight: 600;
`;

const TimeReplyWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export type CommentItemProps = {
  item: Comment;
  //eslint-disable-next-line no-unused-vars
  onReply: (comment: Comment) => void;
  //eslint-disable-next-line no-unused-vars
  handleLongPressComment: (comment: Comment) => void;
};

const CommentItem:React.FC<CommentItemProps> = ({ item, onReply, handleLongPressComment }) => {
  const { t } = useTranslation();
  const [commentItem, setCommentItem] = useState<Comment>(item);
  const [replies, setReplies] = useState<Comments>([]);
  const [repliesLoading, setRepliesLoading] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);

  // Update when prop changes (especially when repliesCount changes from parent)
  useEffect(() => {
    setCommentItem(item);
  }, [item]);

  // When showReplies = true, sync replies from parent item.replies (merge new replies)
  useEffect(() => {
    if (showReplies) {
      if (item.newReplies) {
        setReplies((prev) => {
          // Avoid duplicate replies
          const existingIds = new Set(prev.map(r => r.id));
          const newReplies = item.newReplies!.filter(r => !existingIds.has(r.id));
          return [...prev, ...newReplies];
        });
      }

      if (item.deletedReplyIds) {
        setReplies((prev) => {
          const filtered = prev.filter(r => !item.deletedReplyIds!.includes(String(r.id)));
          setCommentItem((prevItem) => ({
            ...prevItem,
            repliesCount: item.repliesCount - item.deletedReplyIds!.length,
          }));
          return filtered;
        });
      }
    }
  }, [item.newReplies, showReplies, item.deletedReplyIds, item.repliesCount]);
  
  const handleDebounceLikeComment = useMemo(
    () =>
      debounce((commentId, alreadyLiked) => {
        if (alreadyLiked) {
          likePost({ commentId: String(commentId) });
        } else {
          unlikePost({ commentId: String(commentId) });
        }
      }, 500, { leading: true, trailing: true }),
    []
  );
    
  const handleLikeComment = () => {
    setCommentItem((prevComment) => {
      if (!prevComment) return prevComment;
      const newLiked = !prevComment.alreadyLiked;
      const newLikeCount = prevComment.likeCount + (newLiked ? 1 : -1);

      handleDebounceLikeComment(prevComment.id, newLiked);

      return {
        ...prevComment,
        alreadyLiked: newLiked,
        likeCount: newLikeCount,
      };
    });
  };

  const handleFetchReplies = async () => {
    setRepliesLoading(true);
    try {
      const response = await fetchRepliesByCommentId(String(commentItem.id));
      if (response.data) {
        setReplies(response.data);
        setShowReplies(true);
      }
    } catch (error) {
      console.error('Error fetching replies:', error);
    } finally {
      setRepliesLoading(false);
    }
  };

  return (
    <CommentContainer>
      <CommentHeader>
        <BaseItem
          imageContent={commentItem.user?.avatar}
          rowTitle={commentItem.user?.fullName}
          rowSubtitle={commentItem?.content}
          colorText='black'
        />
      </CommentHeader>

      <CommentImageSection>
        <ActionBar>
          <TimeReplyWrapper>
            <TimeText>{formatDate(commentItem.createdAt)}</TimeText>
            <TouchableOpacity onPress={() => onReply(commentItem)}>
              <ReplyText>{t('reply')}</ReplyText>
            </TouchableOpacity>
          </TimeReplyWrapper>

          <ActionButtonWrapper onPress={handleLikeComment}>
            <HeartIcon size={18} color={commentItem.alreadyLiked ? 'red' : undefined}/>
            <Text>{commentItem.likeCount}</Text>
          </ActionButtonWrapper>
        </ActionBar>
      </CommentImageSection>

      {!showReplies ? (
      <>
        {commentItem.repliesCount > 0 && (
          <TouchableOpacity onPress={handleFetchReplies}>
            <View style={{ marginLeft: 60, marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={{ color: '#888', fontWeight: 'bold' }}>{t('view')} {t('replies')} ({commentItem.repliesCount})</Text>
              {repliesLoading && <ActivityIndicator />}
            </View>
          </TouchableOpacity>
        )}  

        {!showReplies && (commentItem.newReplies?.length ?? 0) > 0 && (
          <View style={{ marginLeft: 60, marginTop: 8 }}>
            <FlatList
              data={commentItem?.newReplies}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.4} onLongPress={() => handleLongPressComment(item)}>
                  <CommentItem
                    item={item}
                    onReply={onReply}
                    handleLongPressComment={handleLongPressComment}
                  />
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </>
      ) : (
        showReplies && replies.length > 0 && 
        (<View style={{ marginLeft: 60, marginTop: 8 }}>
          <FlatList
            data={replies}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.4} onLongPress={() => handleLongPressComment(item)}>
                <CommentItem
                  item={item}
                  onReply={onReply}
                  handleLongPressComment={handleLongPressComment}
                />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity onPress={() => setShowReplies(false)}>
            <Text style={{ color: '#888', fontWeight: 'bold' }}>
              {t('hide')}
            </Text>
          </TouchableOpacity>
          </View>
        )
      )
      }
    </CommentContainer>
  );
};

export default CommentItem;
