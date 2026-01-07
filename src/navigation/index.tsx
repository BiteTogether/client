import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { checkAuthToken } from '../store/slices/authSlice';
import { fetchUserProfile } from '../store/slices/userSlice';
import { RootStackParamList } from '../types';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import Settings from '../screens/Settings/SettingsScreen';
import EditProfile from '../screens/Profile/EditProfileScreen';
import Friends from '../screens/Profile/FriendsScreen';
import CreatePost from '../screens/Feed/CreatePostScreen';
import EditPost from '../screens/Feed/EditPostScreen';
import ChatDetail from '../screens/Chat/ChatDetailScreen';
import { getApp } from '@react-native-firebase/app';
import { getAnalytics, logEvent } from '@react-native-firebase/analytics';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Only check auth token if we have a persisted token but not authenticated
    // This handles edge cases where token exists but state is inconsistent
    if (token && !isAuthenticated) {
      dispatch(checkAuthToken()).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          dispatch(fetchUserProfile());
        }
      });
    } else if (isAuthenticated && token) {
      // If already authenticated (from persist), fetch profile from server
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated, token]);

  // function to get active route name from navigation state
  const getActiveRouteName = (state: any): string | undefined => {
    if (!state) return undefined;
    const route = state.routes[state.index];
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    return route.name;
  };

  // Modular Firebase Analytics tracking
  const onNavigationStateChange = async (state: any) => {
    const screenName = getActiveRouteName(state);
    if (screenName) {
      try {
        const app = getApp();
        const analyticsInstance = getAnalytics(app);
        await logEvent(analyticsInstance, 'screen_view' as string, {
          screen_name: screenName,
          screen_class: screenName,
        });
      } catch (error) {
        console.error('Analytics error:', error);
      }
    }
  };

  return (
    <NavigationContainer onStateChange={onNavigationStateChange}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Friends" component={Friends} />
            <Stack.Screen name="ChatDetail" component={ChatDetail} />

            <Stack.Screen
              name="CreatePost"
              component={CreatePost}
              options={{ animation: 'slide_from_bottom' }}
            />

            <Stack.Screen
              name="EditPost"
              component={EditPost}
              options={{ animation: 'slide_from_bottom' }}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
