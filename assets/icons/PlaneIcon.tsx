import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from 'utils/constants';

export type IconProps = {
  size?: number;
  color?: string;
};

const PlaneIcon: React.FC<IconProps> = ({ size = 15, color = COLORS.ICON }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
    >
      <Path
        d="M0.72337 5.31659L13.8391 0.111402C14.6748 -0.220537 15.1706 0.216511 14.9459 1.08727L11.6823 13.7441C11.4577 14.6148 10.6742 14.909 9.93195 14.4015L6.53316 12.0757L3.9467 14.2678C3.26095 14.8496 2.70467 14.5921 2.70467 13.6928V8.99629L0.431723 6.99414C-0.242949 6.39943 -0.112638 5.64853 0.72337 5.31659ZM6.0604 10.5199L13.185 2.1231L4.22817 8.84078L6.0604 10.5199Z"
        fill="#010002"
        stroke={color}
        strokeWidth="0.00064"
      />
    </Svg>
  );
};

export default PlaneIcon;
