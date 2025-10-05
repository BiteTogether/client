import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from 'utils/constants';

export type IconProps = {
  size?: number;
  color?: string;
};

const HamburgerIcon: React.FC<IconProps> = ({
  size = 25,
  color = COLORS.ICON,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
    >
      <Path
        d="M18.5676 5H11.4324C8.31287 5 5.66091 7.1043 4.69117 10.0361C4.37191 11.0014 4.21228 11.484 4.61332 11.992C5.01436 12.5 5.66721 12.5 6.97292 12.5H23.0271C24.3328 12.5 24.9856 12.5 25.3867 11.992C25.7877 11.484 25.6281 11.0014 25.3088 10.0361C24.3391 7.1043 21.6871 5 18.5676 5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 20H4.375C3.33947 20 2.5 19.1605 2.5 18.125C2.5 17.0895 3.33947 16.25 4.375 16.25H14.2431C14.7366 16.25 15.2191 16.3961 15.6298 16.6699L18.0566 18.2877C18.4765 18.5677 19.0235 18.5677 19.4434 18.2877L21.8702 16.6699C22.2809 16.3961 22.7634 16.25 23.2569 16.25H25.625C26.6605 16.25 27.5 17.0895 27.5 18.125C27.5 19.1605 26.6605 20 25.625 20H25M5 20L5.53988 22.1595C5.95722 23.8289 7.45716 25 9.17791 25H20.8221C22.5428 25 24.0428 23.8289 24.4601 22.1595L25 20M5 20H13.75M25 20H23.125"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.7598 8.75L18.7508 8.75"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.125 8.125L11.875 9.375"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HamburgerIcon;
