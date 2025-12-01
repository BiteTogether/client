import React, { useState, useMemo } from 'react';
import styled from 'styled-components/native';
import HeartIcon from '@assets/icons/HeartIcon';
import { TouchableOpacity, Text } from 'react-native';
import { Comment } from 'types/feed';
import BaseItem from 'components/common/items/BaseItem';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'utils/helpers/formatting';
import debounce from 'lodash.debounce';
import { likePost, unlikePost } from 'services/api/feedApi';

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
};

const CommentItem:React.FC<CommentItemProps> = ({ item }) => {
  const { t } = useTranslation();
  const [commentItem, setCommentItem] = useState<Comment>(item);

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
            <TouchableOpacity>
              <ReplyText>{t('reply')}</ReplyText>
            </TouchableOpacity>
          </TimeReplyWrapper>

          <ActionButtonWrapper onPress={handleLikeComment}>
            <HeartIcon size={18} color={commentItem.alreadyLiked ? 'red' : undefined}/>
            <Text>{commentItem.likeCount}</Text>
          </ActionButtonWrapper>
        </ActionBar>
      </CommentImageSection>
    </CommentContainer>
  );
};

export default CommentItem;
