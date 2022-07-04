import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthParamList } from '../AuthParamList';
import { Login } from '../components/Login';
import { Register } from '../components/Register';

const Stack = createNativeStackNavigator<AuthParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
