import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from '../screens/Favorites/FavoritesScreen';
import Swiping from '../screens/Swiping/SwipingScreen';
import ChatNavigator from './ChatNavigator';
import Profile from '../screens/Profile/ProfileScreen';
import HeartIcon from '@assets/icons/HeartIcon';
import HamburgerIcon from '@assets/icons/HamburgerIcon';
import ChatIcon from '@assets/icons/ChatIcon';
import HomeIcon from '@assets/icons/HomeIcon';
import Avatar from 'components/common/Avatar';
import FeedNavigator from './FeedNavigator';

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
  <Tab.Screen name="Feed" component={FeedNavigator} />
  <Tab.Screen name="Favorites" component={Favorites} />
  <Tab.Screen name="Swiping" component={Swiping} />
  <Tab.Screen name="Chat" component={ChatNavigator} />
  <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
