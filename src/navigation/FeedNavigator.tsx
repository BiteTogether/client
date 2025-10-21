import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FeedStackParamList } from '../types';
import Feed from 'screens/Feed/FeedScreen';
import CreatePost from 'screens/Feed/CreatePostScreen';

const Stack = createNativeStackNavigator<FeedStackParamList>();

const FeedNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;