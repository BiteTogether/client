import React from 'react';
import { FlatList, Dimensions, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Image } from 'react-native-elements';

// Dummy data, thay thế bằng dữ liệu thật khi cần
const data = [
  { id: '1', uri: 'https://images.happycow.net/venues/1024/35/19/hcmp351920_3139770.jpeg' },
  { id: '2', uri: 'https://images.happycow.net/venues/1024/35/19/hcmp351920_3139770.jpeg' },
  { id: '3', uri: 'https://images.happycow.net/venues/1024/35/19/hcmp351920_3139770.jpeg' },
  { id: '4', uri: 'https://images.happycow.net/venues/1024/35/19/hcmp351920_3139770.jpeg' },
  { id: '5', uri: 'https://images.happycow.net/venues/1024/35/19/hcmp351920_3139770.jpeg' },
  { id: '6', uri: 'https://images.happycow.net/venues/1024/35/19/hcmp351920_3139770.jpeg' },
  { id: '7', uri: 'https://images.happycow.net/venues/1024/35/19/hcmp351920_3139770.jpeg' },
  { id: '8', uri: 'https://images.happycow.net/venues/1024/35/19/hcmp351920_3139770.jpeg' },
  { id: '9', uri: 'https://images.happycow.net/venues/1024/35/19/hcmp351920_3139770.jpeg' },
];

const GAP = 2;
const NUM_COLUMNS = 3;
const IMAGE_SIZE = (Dimensions.get('window').width - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

const renderItem = ({ item, index }) => {
  const isFirstColumn = index % NUM_COLUMNS === 0;
  const isLastColumn = (index + 1) % NUM_COLUMNS === 0;
  return (
    <ImageWrapper
      style={{
        marginLeft: isFirstColumn ? 0 : GAP,
        marginRight: isLastColumn ? 0 : 0,
        marginBottom: GAP,
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={{ width: '100%', height: '100%'}}
        PlaceholderContent={<ActivityIndicator />}
      />
      {/* Có thể thêm icon góc trên trái ở đây nếu muốn */}
    </ImageWrapper>
  );
};

const ProfileImageGrid = () => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={NUM_COLUMNS}
      scrollEnabled={false}
      columnWrapperStyle={{}}
    />
  );
};


const ImageWrapper = styled.View`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`;

export default ProfileImageGrid;
