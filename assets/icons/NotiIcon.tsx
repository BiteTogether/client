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
        d="M15.625 17.7084H9.375V18.75C9.375 20.4759 10.7741 21.875 12.5 21.875C14.2259 21.875 15.625 20.4759 15.625 18.75V17.7084Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.20835 17.7084H19.7917C20.367 17.7084 20.8334 17.242 20.8334 16.6667V16.0565C20.8334 15.7802 20.7236 15.5153 20.5283 15.3199L19.9961 14.7878C19.8652 14.6569 19.7917 14.4793 19.7917 14.2942V10.4167C19.7917 6.38958 16.5271 3.12499 12.5 3.125C8.47293 3.12501 5.20835 6.3896 5.20835 10.4167V14.2942C5.20835 14.4793 5.13481 14.6569 5.00389 14.7878L4.47178 15.3199C4.27643 15.5153 4.16669 15.7802 4.16669 16.0565V16.6667C4.16669 17.242 4.63306 17.7084 5.20835 17.7084Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default NotiIcon;
