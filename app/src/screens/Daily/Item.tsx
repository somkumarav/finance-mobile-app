import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { DailyParamList } from './Daily';
import { DailyContext } from './DailyProvider';

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

export const Item = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<DailyParamList, 'Item'>;
}) => {
  const { deleteData } = useContext(DailyContext);
  const route = useRoute<RouteProp<DailyParamList, 'Item'>>();
  const { id, amount, date, email, note, payee, remitter } = route.params.item;

  return (
    <View style={styles.item}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.amountText}>₹{amount}</Text>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
            {remitter}
          </Text>
        </View>
        <View style={styles.cardMain}>
          <Text style={{ color: 'white' }}>{note}</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{date}</Text>
        </View>
      </View>

      <View style={styles.buttonView}>
        <Pressable
          style={styles.button}
          android_ripple={{ color: '#D90024', borderless: true }}
          onPress={() => {
            deleteData(id);
            navigation.goBack();
          }}
        >
          <Image
            style={{
              height: 30,
              width: 30,
            }}
            source={{
              uri: 'https://www.clipartmax.com/png/full/360-3603708_google-received-delete-icon-png-transparent.png',
            }}
          />
        </Pressable>
      </View>
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

  card: {
    padding: 10,
    backgroundColor: '#36A436',
    height: 200,
    width: 300,
    borderRadius: 10,
  },

  cardHeader: {
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  amountText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  cardMain: {
    height: '55%',
  },

  cardFooter: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 70,
    width: 70,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7B7B7B',
  },
  buttonView: {
    // alignSelf: 'center',
    // justifyContent: 'center',
    borderRadius: 35,
    elevation: 25,
    margin: 10,
  },
});
