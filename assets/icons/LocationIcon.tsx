import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from 'utils/constants';

export type IconProps = {
  size?: number;
  color?: string;
};

const LocationIcon: React.FC<IconProps> = ({
  size = 25,
  color = COLORS.ICON,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M5.9375 15.625C4.20184 16.2868 3.125 17.2089 3.125 18.2289C3.125 20.2426 7.32233 21.875 12.5 21.875C17.6777 21.875 21.875 20.2426 21.875 18.2289C21.875 17.2089 20.7981 16.2868 19.0625 15.625M12.5 9.375H12.5104M18.75 9.375C18.75 13.608 14.0625 15.625 12.5 18.75C10.9375 15.625 6.25 13.608 6.25 9.375C6.25 5.92322 9.04822 3.125 12.5 3.125C15.9518 3.125 18.75 5.92322 18.75 9.375ZM13.5417 9.375C13.5417 9.95029 13.0753 10.4167 12.5 10.4167C11.9247 10.4167 11.4583 9.95029 11.4583 9.375C11.4583 8.79971 11.9247 8.33333 12.5 8.33333C13.0753 8.33333 13.5417 8.79971 13.5417 9.375Z"
        stroke={color}
        strokeWidth="1.92"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default LocationIcon;
