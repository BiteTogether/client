import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed/FeedScreen';
import Favorites from '../screens/Favorites/FavoritesScreen';
import Swiping from '../screens/Swiping/SwipingScreen';
import Chat from '../screens/Chat/ChatListScreen';
import Profile from '../screens/Profile/ProfileScreen';
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
  <Tab.Screen 
    name="Feed" 
    component={Feed} 
    listeners={({ navigation }) => ({
      tabPress: (e) => {
        const state = navigation.getState();
        const currentRoute = state.routes[state.index];
        if (currentRoute.name === 'Feed') {
          const params = currentRoute.params as { id?: string } | undefined;
          if (params?.id && params.id !== 'null') {
            e.preventDefault();
            navigation.setParams({ id: null });
          }
        } else {
          e.preventDefault();
          navigation.navigate('Feed', { id: null });
        }
      },
    })}
  />
  <Tab.Screen name="Favorites" component={Favorites} />
  <Tab.Screen name="Swiping" component={Swiping} />
  <Tab.Screen name="Chat" component={Chat} />
  <Tab.Screen 
    name="Profile" 
    component={Profile} 
    listeners={({ navigation }) => ({
      tabPress: (e) => {
        // Instagram-style tab behavior
        const state = navigation.getState();
        const currentRoute = state.routes[state.index];
        
        if (currentRoute.name === 'Profile') {
          // Already on Profile tab
          const params = currentRoute.params as { id?: string } | undefined;
          
          if (params?.id && params.id !== 'null') {
            // Viewing someone else's profile → reset to own profile
            e.preventDefault();
            navigation.setParams({ id: null });
          }
          // If already viewing own profile → allow default behavior (scroll to top)
          
        } else {
          // Coming from another tab → navigate to own profile
          e.preventDefault();
          navigation.navigate('Profile', { id: null });
        }
      },
    })}
  />
    </Tab.Navigator>
  );
};

export default MainNavigator;
