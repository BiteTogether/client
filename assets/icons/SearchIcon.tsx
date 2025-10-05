import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from 'utils/constants';

export type IconProps = {
  size?: number;
  color?: string;
};

const SearchIcon: React.FC<IconProps> = ({ size = 25, color = COLORS.ICON }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
    >
      <Path
        d="M19.7917 10.9375C19.7917 12.6887 19.2724 14.4006 18.2995 15.8567C17.3265 17.3127 15.9437 18.4476 14.3258 19.1177C12.7079 19.7879 10.9277 19.9632 9.21012 19.6216C7.49258 19.2799 5.91492 18.4367 4.67664 17.1984C3.43837 15.9601 2.59509 14.3824 2.25345 12.6649C1.91181 10.9474 2.08715 9.16709 2.7573 7.5492C3.42745 5.93131 4.56231 4.54848 6.01837 3.57557C7.47443 2.60266 9.1863 2.08337 10.9375 2.08337C13.2858 2.08337 15.5378 3.01622 17.1983 4.6767C18.8588 6.33718 19.7917 8.58927 19.7917 10.9375Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.7917 17.199L23.5095 22.9167"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SearchIcon;
