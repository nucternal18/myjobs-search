import React from 'react'
import { TouchableOpacity, View, Text, Image, ImageSourcePropType } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({
  iconUrl,
  dimension,
  onPress,
}: {
  iconUrl: ImageSourcePropType;
  dimension: string;
  onPress?(): void;
}) => {
  return (
    <TouchableOpacity style={styles(dimension).btnContainer} onPress={onPress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={[styles(dimension).btnImg]}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn