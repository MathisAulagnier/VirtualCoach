import React from 'react';
import { Image } from 'react-native';

const CustomImage = ({ imagePath, style }) => {
  // imagePath="../../data/data_gifs/Shoulder/dumbbell-shoulder-press.gif"
  return <Image source={{ uri: `${imagePath}` }} style={style} />;
};

export default CustomImage;