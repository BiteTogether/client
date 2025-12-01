import React from 'react';
import { FlatList, Dimensions, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Image } from 'react-native-elements';
import { Post, Posts } from 'types/feed';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'types/index';

const GAP = 2;
const NUM_COLUMNS = 3;
const IMAGE_SIZE = (Dimensions.get('window').width - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

const ImageWrapper = styled.TouchableOpacity`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`;

export type ProfileImageGridProps = {
  data: Posts;
};

const renderItem = (navigation: NativeStackNavigationProp<RootStackParamList>) =>
  ({ index, item }: { index: number; item: Post }) => {
    const isFirstColumn = index % NUM_COLUMNS === 0;
    const isLastColumn = (index + 1) % NUM_COLUMNS === 0;

    const handlePressImage = () => {
      navigation.navigate('Main', { screen: 'Feed', params: { id: String(item.user.id) } });
    };

    return (
      <ImageWrapper
        style={{
          marginLeft: isFirstColumn ? 0 : GAP,
          marginRight: isLastColumn ? 0 : 0,
          marginBottom: GAP,
        }}
        onPress={handlePressImage}
      >
        <Image
          source={{ uri: item.photoUrl }}
          style={{ width: '100%', height: '100%'}}
          PlaceholderContent={<ActivityIndicator />}
        />
        {/* Can add icon on top left corner here if needed */}
      </ImageWrapper>
    );
  };

const ProfileImageGrid: React.FC<ProfileImageGridProps> = ({ data }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <FlatList
      data={data}
      renderItem={renderItem(navigation)}
      keyExtractor={item => item.id}
      numColumns={NUM_COLUMNS}
      scrollEnabled={false}
      columnWrapperStyle={{}}
    />
  );
};

export default ProfileImageGrid;
