import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ChatStackParamList } from '../types';
import MessageListScreen from '../screens/Chat/MessageListScreen';
import MessageScreen from '../screens/Chat/MessageScreen';

const Stack = createNativeStackNavigator<ChatStackParamList>();

const ChatNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="ChatList" component={MessageListScreen} />
      <Stack.Screen name="ChatDetail" component={MessageScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
