import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from 'utils/constants';

export type IconProps = {
  size?: number;
  color?: string;
};

const ShareIcon: React.FC<IconProps> = ({ size = 25, color = COLORS.ICON }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
    >
      <Path
        d="M22 3L9.21802 10.083"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M11.698 20.334L22 3.00098H2L9.218 10.084L11.698 20.334Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ShareIcon;
