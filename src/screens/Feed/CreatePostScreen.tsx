import React, { useState } from 'react';
import Container from 'components/layout/Container';
import Header from 'components/common/Header';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { COLORS, FONTS } from 'utils/constants/ui';
import { Icon } from "@rneui/themed"
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../hooks/redux';
import FullScreenLoader from 'components/common/FullScreenLoader';
import BaseItem from 'components/common/items/BaseItem';
import ImagePreview from './components/ImagePreview';
import Toast from 'react-native-toast-message';
import { CreatePostRequest } from 'types/feed';
import { createPost } from 'services/api/feedApi';

const Section = styled.View`
  margin: 16px;
`;

const ContentInput = styled.TextInput`
  font-size: ${FONTS.SIZES.LARGE}px;
  padding: 0;
  margin: 0;
`;

const ButtonPostWrapper = styled.TouchableOpacity`
  background-color: ${COLORS.ICON};
  border-radius: 50%;
  padding: 15px;
  align-self: center;
  position: absolute;
  bottom: 10%;
`;

const CreatePost: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const ownProfile = useAppSelector((state) => state.user.profile);
  const [postCreate, setPostCreate] = useState<Partial<CreatePostRequest>>({
    //hard code
    photoUrl: 'https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-1.jpg'
  });

  const handleSetPostRating = (rating: number) => {
    setPostCreate(prev => ({ ...prev, rating }));
  }

  const handleSetPostContent = (content: string) => {
    setPostCreate(prev => ({ ...prev, content }));
  }

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const response = await createPost(postCreate);

      if (response.data) {
        Toast.show({
          type: 'success',
          text1: response.message,
        });

        navigation.goBack();
      }

    } catch (error) {
      console.error('Error creating post:', error);      
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <FullScreenLoader />;

  return (
    <Container>
      <Header
        leftIcon={
          <Icon
            name="x"
            type="feather"
            size={24}
            color="black"
          />
        }
        onLeftPress={() => navigation.goBack()}

        leftTitle={t('create_post')}
      />

      <Section>
        <BaseItem
          imageContent={ownProfile?.avatar}
          rowTitle={ownProfile?.fullName}
          contentInput={
            <ContentInput
              placeholder={t('share_your_food_moment')}
              value={postCreate.content}
              multiline
              placeholderTextColor={COLORS.TEXT.LIGHT}
              onChangeText={handleSetPostContent}
            />
          }
        />  
        
        <ImagePreview uri={'https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-1.jpg'}
          onFinishRating={handleSetPostRating}
        />

      </Section>

      {postCreate.content && (
        <ButtonPostWrapper onPress={handleCreatePost}>
          <Icon
            name="check"
            type="feather"
            size={60}
            color="white"
          />
        </ButtonPostWrapper>
      )}
    </Container>
  );
};

export default CreatePost;
