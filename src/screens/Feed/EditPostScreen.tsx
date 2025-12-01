import React, { useState, useEffect } from 'react';
import Container from 'components/layout/Container';
import Header from 'components/common/Header';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { COLORS, FONTS } from 'utils/constants/ui';
import { Icon } from "@rneui/themed";
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppSelector } from '../../hooks/redux';
import FullScreenLoader from 'components/common/FullScreenLoader';
import BaseItem from 'components/common/items/BaseItem';
import ImagePreview from './components/ImagePreview';
import Toast from 'react-native-toast-message';
import { CreatePostRequest } from 'types/feed';
import { updatePost, getPostById } from 'services/api/feedApi';

const Section = styled.View`
  margin: 16px;
`;

const ContentInput = styled.TextInput`
  font-size: ${FONTS.SIZES.LARGE}px;
  padding: 0;
  margin: 0;
`;

const ButtonUpdateWrapper = styled.TouchableOpacity`
  background-color: ${COLORS.ICON};
  border-radius: 50%;
  padding: 15px;
  align-self: center;
  position: absolute;
  bottom: 10%;
`;

const shallowEqual = (obj1: any, obj2: any) => {
  if (!obj1 || !obj2) return false;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
};

const EditPostScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = (route.params ?? {}) as { id?: string };
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const ownProfile = useAppSelector((state) => state.user.profile);
  const [originalPost, setOriginalPost] = useState<Partial<CreatePostRequest> | null>(null);
  const [postUpdate, setPostUpdate] = useState<Partial<CreatePostRequest>>({
    photoUrl: 'https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-1.jpg'
  });

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await getPostById(String(id));
        if (response.data) {
          setOriginalPost(response.data);
          setPostUpdate(response.data);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSetPostRating = (rating: number) => {
    setPostUpdate(prev => ({ ...prev, rating }));
  };

  const handleSetPostContent = (content: string) => {
    setPostUpdate(prev => ({ ...prev, content }));
  };

  const handleUpdatePost = async () => {
    setLoading(true);
    try {
      const response = await updatePost(String(id), postUpdate);
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: response.message,
        });
        navigation.goBack();
      }
      else {
        Toast.show({
          type: 'error',
          text1: response.message,
        });
      }
    } catch (error) {
      console.error('Error updating post:', error);
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
        leftTitle={t('edit_post')}
      />

      <Section>
        <BaseItem
          imageContent={ownProfile?.avatar}
          rowTitle={ownProfile?.fullName}
          contentInput={
            <ContentInput
              placeholder={t('edit_your_food_moment')}
              value={postUpdate.content}
              multiline
              placeholderTextColor={COLORS.TEXT.LIGHT}
              onChangeText={handleSetPostContent}
            />
          }
        />
        <ImagePreview
          uri={'https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-1.jpg'}
          onFinishRating={handleSetPostRating}
        />
      </Section>

      {postUpdate.content && originalPost && !shallowEqual(postUpdate, originalPost) && (
        <ButtonUpdateWrapper onPress={handleUpdatePost}>
          <Icon
            name="check"
            type="feather"
            size={60}
            color="white"
          />
        </ButtonUpdateWrapper>
      )}
    </Container>
  );
};

export default EditPostScreen;
