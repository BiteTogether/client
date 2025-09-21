import React from 'react';
import Container from 'components/layout/Container';
import Header from 'components/common/Header';
import Avatar from 'components/common/Avatar';
import styled from 'styled-components/native';
import { COLORS, FONTS } from 'utils/constants';
import ProfileImageGrid from './components/ProfileImageGrid';

const UserContainer = styled.View`
  padding: 16px;
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

const UserName = styled.Text`
  color: ${COLORS.TEXT.PRIMARY};
  font-weight: ${FONTS.WEIGHTS.SEMIBOLD};
  font-size: ${FONTS.SIZES.XLARGE};
`;

const UserBio = styled.Text`
  margin-top: 8px;
`;

const UserMeta = styled.View`
  flex-direction: row;
  gap: 40px;
`;

const MetaItem = styled.View``;

const MetaNumber = styled.Text`
  font-weight: ${FONTS.WEIGHTS.SEMIBOLD};
`;

const MetaLabel = styled.Text`
  color: ${COLORS.TEXT.LIGHT};
  font-weight: ${FONTS.WEIGHTS.REGULAR};
`;

const GridMedia = styled.View``;

const Profile: React.FC = () => {
  return (
    <Container>
      <Header />
      <UserContainer>
        <UserInfo>
          <Avatar size="large" />
          <UserDetails>
            <UserName>John Doe</UserName>
            <UserMeta>
              <MetaItem>
                <MetaNumber>108</MetaNumber>
                <MetaLabel>posts</MetaLabel>
              </MetaItem>
              <MetaItem>
                <MetaNumber>10.5K</MetaNumber>
                <MetaLabel>likes</MetaLabel>
              </MetaItem>
              <MetaItem>
                <MetaNumber>20</MetaNumber>
                <MetaLabel>liked brands</MetaLabel>
              </MetaItem>
            </UserMeta>
          </UserDetails>
        </UserInfo>

        <UserBio>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </UserBio>
      </UserContainer>

      <GridMedia>
        <ProfileImageGrid />
      </GridMedia>
    </Container>
  );
};

export default Profile;
