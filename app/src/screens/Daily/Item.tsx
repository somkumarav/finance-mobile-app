import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { DailyParamList } from './Daily';

interface Item {
  item: {
    id: number;
    amount: number;
    date: string;
    email: string;
    note: string;
    payee: string;
    remitter: string;
  };
}

// TODO
// 1. Add UI
// 2. Add Delete Functionality

export const Item = () => {
  const route = useRoute<RouteProp<DailyParamList, 'Item'>>();
  // const { getData } = useContext(DailyContext);
  const { id, amount, date, email, note, payee, remitter } = route.params.item;

  return (
    <View style={styles.item}>
      <Text style={{ color: '#ffffff' }}>{note}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
