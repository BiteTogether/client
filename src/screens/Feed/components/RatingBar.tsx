import React from 'react';
import { Rating } from 'react-native-ratings';

export type RatingBarProps = {
    //eslint-disable-next-line no-unused-vars
    onFinishRating: (rating: number) => void;
    size?: number;
    style?: object;
    tintColor?: string;
};

const RatingBar: React.FC<RatingBarProps> = ({ onFinishRating, size = 40, style, tintColor }) => {
  return (
    <>
      <Rating
        startingValue={0}
        imageSize={size}
        onFinishRating={onFinishRating}
        style={{...style}}
        tintColor={tintColor}
      />
    </> 
  );
};

export default RatingBar;
