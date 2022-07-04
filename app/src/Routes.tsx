import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from './AuthProvider';
import { Pressable, Text, View } from 'react-native';
import { AuthStack } from './screens/AuthStack';
import { MainTabs } from './screens/MainTabs';

export const Routes = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
