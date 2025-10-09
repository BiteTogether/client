import React from 'react';
import styled from 'styled-components/native';
import Header from '../../components/common/Header';
import PostItem from './components/PostItem';
import SearchIcon from '@assets/icons/SearchIcon';
import NotiIcon from '@assets/icons/NotiIcon';
import CreatePostIcon from '@assets/icons/CreatePostIcon';
import Container from 'components/layout/Container';

const ContentArea = styled.View`
  flex: 1;
  width: 100%;
`;

const Feed: React.FC = () => {
  return (
    <Container>
      <Header
        rightIcons={[<CreatePostIcon />, <SearchIcon />, <NotiIcon />]}
        // onRightPress={[handleSearch, handleNoti]}
      />
      <ContentArea>
        <PostItem />
      </ContentArea>
    </Container>
  );
};

export default Feed;
