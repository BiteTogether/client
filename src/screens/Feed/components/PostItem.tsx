import React, { useState, useMemo } from 'react';
import styled from 'styled-components/native';
import LocationIcon from '@assets/icons/LocationIcon';
import ThreeDotsIcon from '@assets/icons/ThreeDotsIcon';
import HeartIcon from '@assets/icons/HeartIcon';
import CommentIcon from '@assets/icons/CommentIcon';
import ShareIcon from '@assets/icons/ShareIcon';
import { Image as ImageRNE } from 'react-native-elements';
import { ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { Post } from 'types/feed';
import BaseItem from 'components/common/items/BaseItem';
import { likePost, unlikePost } from 'services/api/feedApi';
import debounce from 'lodash.debounce';

const PostContainer = styled.View`
  padding: 16px;
`;

const PostHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const PostLocation = styled.View`
  flex-direction: row;
  gap: 4px;
`;

const PostImageSection = styled.View`
  flex-direction: column;
  padding-left: 60px;
  padding-right: 40px;
`;

const ActionBar = styled.View`
  margin-top: 8px;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  gap: 30px;
`;

const ImageWrapper = styled.View`
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ActionButtonWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export type PostItemProps = {
  item: Post;
  setSelectorModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCommentModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
};

const PostItem:React.FC<PostItemProps> = ({ item, setSelectorModalVisible, setCommentModalVisible, setSelectedPost }) => {
  const [postItem, setPostItem] = useState<Post>(item);

  const handleOpenSelectorModal = () => {
    setSelectedPost(postItem);
    setSelectorModalVisible(true);
  };

  const handleOpenCommentModal = () => {
    setSelectedPost(postItem);
    setCommentModalVisible(true);
  };

  // Debounce like and unlike post to prevent multiple rapid requests
  const handleDebounceLikePost = useMemo(
    () =>
      debounce((postId, alreadyLiked) => {
        if (alreadyLiked) {
          likePost({ postId: String(postId) });
        } else {
          unlikePost({ postId: String(postId) });
        }
      }, 500, { leading: true, trailing: true }),
    []
  );
  
  const handleLikePost = () => {
    setPostItem((prevPost) => {
      if (!prevPost) return prevPost;
      const newLiked = !prevPost.alreadyLiked;
      const newLikeCount = prevPost.likeCount + (newLiked ? 1 : -1);

      handleDebounceLikePost(prevPost.id, newLiked);

      return {
        ...prevPost,
        alreadyLiked: newLiked,
        likeCount: newLikeCount,
      };
    });
  };

  return (
    <PostContainer>
      <PostHeader>
        <BaseItem
          imageContent={postItem.user?.avatar}
          rowTitle={postItem.user?.fullName}
          rowSubtitle={postItem?.content}
          colorText='black'
        />

        <PostLocation>
          <LocationIcon />
          <TouchableOpacity onPress={handleOpenSelectorModal}>
            <ThreeDotsIcon />
          </TouchableOpacity>
        </PostLocation>
      </PostHeader>

      <PostImageSection>
        {postItem.photoUrl && (
          <ImageWrapper>
            <ImageRNE
              source={{ uri: postItem.photoUrl }}
              style={{ width: '100%', minHeight: 200, borderRadius: 15 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </ImageWrapper>
        )}
        <ActionBar>
          <ActionButtonWrapper onPress={handleLikePost}>
            <HeartIcon size={22} color={postItem.alreadyLiked ? 'red' : undefined}/>
            <Text>{postItem.likeCount}</Text>
          </ActionButtonWrapper>

          <ActionButtonWrapper onPress={handleOpenCommentModal}>
            <CommentIcon size={22} />
            <Text>{postItem.commentCount}</Text>
          </ActionButtonWrapper>

          <ShareIcon size={22} />
        </ActionBar>
      </PostImageSection>
    </PostContainer>
  );
};

export default PostItem;
