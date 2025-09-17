import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from 'utils/constants';

export type IconProps = {
  size?: number;
  color?: string;
};

const NotiIcon: React.FC<IconProps> = ({ size = 25, color = COLORS.ICON }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M19.7917 3.125H5.20833C4.05774 3.125 3.125 4.05774 3.125 5.20833V19.7917C3.125 20.9423 4.05774 21.875 5.20833 21.875H19.7917C20.9423 21.875 21.875 20.9423 21.875 19.7917V5.20833C21.875 4.05774 20.9423 3.125 19.7917 3.125Z"
        stroke={color}
        strokeWidth="1.92"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 8.33337V16.6667"
        stroke={color}
        strokeWidth="1.92"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.33331 12.5H16.6666"
        stroke={color}
        strokeWidth="1.92"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default NotiIcon;
