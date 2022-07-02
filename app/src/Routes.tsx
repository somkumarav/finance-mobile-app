import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthParamList } from './AuthParamList';

import { Login } from './components/Login';
import { Register } from './components/Register';
import { AuthContext } from './AuthProvider';
import { Pressable, Text, View } from 'react-native';

const Stack = createNativeStackNavigator<AuthParamList>();

export const Routes = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: user.color,
          }}
        >
          <Text>Hi {user.name}, Welcome to finance</Text>
          <Pressable onPress={logout}>
            <Text>Logout</Text>
          </Pressable>
        </View>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
