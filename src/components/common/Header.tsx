import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from 'utils/constants/ui';
import { TouchableOpacity, Text } from 'react-native';

export type HeaderProps = {
  leftIcon?: React.ReactNode;
  leftTitle?: string;
  rightIcons?: React.ReactNode[];
  onLeftPress?: () => void;
  onRightPress?: Array<() => void>;
  title?: string;
  centerContent?: React.ReactNode;
  style?: object;
};

const Container = styled.View`
  width: 100%;
  height: 84px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: ${COLORS.HEADER_BG};
`;

const Left = styled.View`
  margin-top: 40px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const Right = styled.View`
  margin-top: 40px;
  flex-direction: row;
  align-items: center;
  gap: 22px;
`;

const LeftTitle = styled.Text`
  fontSize: 20px;
  fontWeight: bold;
`;

const Header: React.FC<HeaderProps> = ({
  leftIcon,
  leftTitle,
  rightIcons = [],
  onLeftPress,
  onRightPress = [],
  title,
  centerContent,
  style,
}) => {
  return (
    <Container style={style}>
      <Left>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress}>{leftIcon}</TouchableOpacity>
        )}
        {leftTitle && (
          <LeftTitle>{leftTitle}</LeftTitle>
        )}
      </Left>
      <Center>
        {centerContent ? centerContent : title ? <Text>{title}</Text> : null}
      </Center>
      <Right>
        {rightIcons.map((icon, idx) => (
          <TouchableOpacity key={idx} onPress={onRightPress[idx]}>
            {icon}
          </TouchableOpacity>
        ))}
      </Right>
    </Container>
  );
};

export default Header;
