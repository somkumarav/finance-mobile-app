import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParamList } from '../AppParamList';
import { Daily } from './Daily/Daily';
import { Personal } from './Personal/Personal';

const Tabs = createBottomTabNavigator<AppParamList>();

export const MainTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Personal"
      screenOptions={{
        header: () => null,
        tabBarIcon: () => null,
        tabBarStyle: {
          backgroundColor: '#222222',
          borderTopColor: '#222222',
        },
        tabBarLabelStyle: {
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 10,
        },
        tabBarItemStyle: {
          borderLeftWidth: 1,
          borderLeftColor: '#ffffff',
          borderRightWidth: 1,
          borderRightColor: '#ffffff',
        },
      }}
    >
      <Tabs.Screen name="Personal" component={Personal} />
      <Tabs.Screen name="Daily" component={Daily} />
    </Tabs.Navigator>
  );
};
