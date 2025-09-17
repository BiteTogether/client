import React from 'react';
import { Avatar as RNEAvatar } from 'react-native-elements';

export type AvatarProps = {
  size?: ('small' | 'medium' | 'large' | 'xlarge') | number;
  uri?: string;
};

const Avatar = ({ size = 'medium', uri }: AvatarProps) => (
  <RNEAvatar
    rounded
    size={size}
    source={{ uri: uri || 'https://via.placeholder.com/40' }}
  />
);

export default Avatar;
