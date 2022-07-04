import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PersonalTransactions } from '../components/PersonalTransactions';
import { DailyTransactions } from '../components/DailyTransaction';
import { AppParamList } from '../AppParamList';

const Tabs = createBottomTabNavigator<AppParamList>();

export const MainTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Daily"
      screenOptions={{
        header: () => null,
        tabBarIcon: () => null,
      }}
    >
      <Tabs.Screen name="Personal" component={PersonalTransactions} />
      <Tabs.Screen name="Daily" component={DailyTransactions} />
    </Tabs.Navigator>
  );
};
