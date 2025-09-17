import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from 'utils/constants';

export type IconProps = {
  size?: number;
  color?: string;
};

const HomeIcon: React.FC<IconProps> = ({ size = 25, color = COLORS.ICON }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
    >
      <Path
        d="M8.7055 16.9995C8.7055 16.1252 9.05283 15.2866 9.67108 14.6684C10.2893 14.0501 11.1279 13.7028 12.0022 13.7028C12.4352 13.7027 12.864 13.7878 13.2641 13.9534C13.6642 14.119 14.0278 14.3619 14.334 14.668C14.6403 14.9741 14.8832 15.3376 15.0489 15.7377C15.2147 16.1377 15.3 16.5665 15.3 16.9995V23H23V11.4973L12 1L1 11.4973V23H8.7055V16.9995Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HomeIcon;
