import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

const FullScreenLoader: React.FC = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color={COLORS.ACCENT} />
  </View>
);

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    zIndex: 999,
  },
});

export default FullScreenLoader;
