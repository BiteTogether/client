import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from 'utils/constants';

export type IconProps = {
  size?: number;
  color?: string;
};

const PlusIcon: React.FC<IconProps> = ({ size = 16, color = COLORS.ICON }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M1.28003 7.53003H13.78M7.53003 1.28003V13.78"
        stroke={color}
        strokeOpacity="0.4"
        strokeWidth="2.56"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PlusIcon;
