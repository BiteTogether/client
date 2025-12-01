import React from 'react';
import RatingBar from './RatingBar';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { styled } from 'styled-components/native';
import { Icon } from '@rneui/themed';

export type ImagePreviewProps = {
  uri: string;
  //eslint-disable-next-line no-unused-vars
  onFinishRating: (rating: number) => void;
};

const ImageWrapper = styled.View`
  margin: 16px 0;
`;

const RatingBarWrapper = styled.View`
  position: absolute;
  bottom: 10%;
  width: 100%;
  align-items: center;
`;

const IconXWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0,0,0,0.5);
  border-radius: 50px;
  padding: 5px;
`;

const ImagePreview: React.FC<ImagePreviewProps> = ({ uri, onFinishRating }) => {
  return (
    <>
      <ImageWrapper>
        <Image
          source={{ uri: uri }}
          style={{ width: '100%', minHeight: 300, borderRadius: 15 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <IconXWrapper>
          <Icon key="x" name="x" type="feather" size={20} color="white" />
        </IconXWrapper>
        <RatingBarWrapper>
          <RatingBar
            tintColor="#222"
            size={30}
            onFinishRating={onFinishRating}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: '#222',
              borderRadius: 50,
              alignSelf: 'center',
            }}
          />
        </RatingBarWrapper>
      </ImageWrapper>
    </>
  );
};

export default ImagePreview;
