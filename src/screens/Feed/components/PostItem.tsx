import React from 'react';
import styled from 'styled-components/native';
import Avatar from 'components/common/Avatar';
import LocationIcon from '@assets/icons/LocationIcon';
import ThreeDotsIcon from '@assets/icons/ThreeDotsIcon';
import HeartIcon from '@assets/icons/HeartIcon';
import CommentIcon from '@assets/icons/CommentIcon';
import ShareIcon from '@assets/icons/ShareIcon';
import { Image as ImageRNE } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { COLORS, FONTS } from 'utils/constants/ui';

const PostContainer = styled.View`
  padding: 16px;
`;

const PostHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
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

const UserMeta = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const UserName = styled.Text`
  color: ${COLORS.TEXT.PRIMARY};
  font-weight: ${FONTS.WEIGHTS.SEMIBOLD};
`;

const PostTime = styled.Text`
  color: ${COLORS.TEXT.LIGHT};
`;

const PostDescription = styled.Text``;

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
  margin-top: 16px;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  gap: 30px;
`;

const PostItem = () => {
  return (
    <PostContainer>
      <PostHeader>
        <UserInfo>
          <Avatar />
          <UserDetails>
            <UserMeta>
              <UserName>Phuong Thao</UserName>
              <PostTime>2h</PostTime>
            </UserMeta>
            <PostDescription>I love it!</PostDescription>
          </UserDetails>
        </UserInfo>

        <PostLocation>
          <LocationIcon />
          <ThreeDotsIcon />
        </PostLocation>
      </PostHeader>

      <PostImageSection>
        <ImageRNE
          source={{
            uri: 'https://www.estellaplace.com.vn/Data/Sites/1/Product/141/pz_est_e-information-2.jpg',
          }}
          style={{ width: '100%', minHeight: 200, borderRadius: 15 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <ActionBar>
          <HeartIcon size={22} />
          <CommentIcon size={22} />
          <ShareIcon size={22} />
        </ActionBar>
      </PostImageSection>
    </PostContainer>
  );
};

export default PostItem;
