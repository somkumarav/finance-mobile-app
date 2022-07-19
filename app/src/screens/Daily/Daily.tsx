import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DailyAll } from './DailyAll';
import { DailyProvider } from './DailyProvider';
import { Item } from './Item';

export type DailyParamList = {
  All: undefined;
  Item: {
    item: {
      id: number;
      amount: number;
      date: string;
      email: string;
      note: string;
      payee: string;
      remitter: string;
    };
  };
};

export const Daily = () => {
  const Stack = createNativeStackNavigator<DailyParamList>();
  return (
    <DailyProvider>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name="All" component={DailyAll} />
        <Stack.Screen name="Item" component={Item} />
      </Stack.Navigator>
    </DailyProvider>
  );
};
