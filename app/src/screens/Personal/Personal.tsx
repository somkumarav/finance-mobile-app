import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PersonalAll } from './PersonalAll';
import { PersonalItem } from './PersonalItem';
import { PersonalProvider } from './PersonalProvider';

export type PersonalParamList = {
  All: undefined;
  Item: {
    item: {
      amount: number;
      remitter: string;
    };
  };
};

export const Personal = () => {
  const Stack = createNativeStackNavigator<PersonalParamList>();
  return (
    <PersonalProvider>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name="All" component={PersonalAll} />
        <Stack.Screen name="Item" component={PersonalItem} />
      </Stack.Navigator>
    </PersonalProvider>
  );
};
