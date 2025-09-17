import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';
import Favorites from '../screens/Favorites';
import Swiping from '../screens/Swiping';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import HeartIcon from '@assets/icons/HeartIcon';
import HamburgerIcon from '@assets/icons/HamburgerIcon';
import ChatIcon from '@assets/icons/ChatIcon';
import HomeIcon from '@assets/icons/HomeIcon';
import Avatar from 'components/common/Avatar';

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Feed':
              return <HomeIcon color={color} size={size} />;
            case 'Favorites':
              return <HeartIcon color={color} size={size} />;
            case 'Swiping':
              return <HamburgerIcon color={color} size={size} />;
            case 'Chat':
              return <ChatIcon color={color} size={size} />;
            case 'Profile':
              return <Avatar size={size} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Swiping" component={Swiping} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
