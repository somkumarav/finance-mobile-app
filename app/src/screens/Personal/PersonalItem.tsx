import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AuthContext } from '../../AuthProvider';
import { PersonalParamList } from './Personal';
import { PersonalContext } from './PersonalProvider';

interface PersonData {
  id: number;
  amount: number;
  date: string;
  email: string;
  note: string;
  payee: string;
  remitter: string;
}

interface Item {
  itemData: PersonData;
  deleteData: (id: number) => void;
}

const Item: React.FC<Item> = ({ itemData, deleteData }) => {
  console.log(itemData);
  return (
    <View style={styles.item}>
      <View style={styles.itemAmount}>
        <Text style={styles.text}>{itemData.amount}</Text>
      </View>
      <View style={styles.itemNote}>
        <Text style={styles.text}>{itemData.note}</Text>
        <Text style={{ color: '#ffffff', opacity: 0.4, fontWeight: 'bold' }}>
          {itemData.date}
        </Text>
      </View>
      <Pressable
        android_ripple={{ color: '#D90024' }}
        style={styles.itemDelete}
        onPress={() => {
          deleteData(itemData.id);
        }}
      >
        <Image
          style={{
            height: 20,
            width: 20,
          }}
          source={{
            uri: 'https://www.clipartmax.com/png/full/360-3603708_google-received-delete-icon-png-transparent.png',
          }}
        />
      </Pressable>
    </View>
  );
};

export const PersonalItem = ({}) => {
  const [personData, setPersonData] = useState<PersonData[]>([]);
  const { user } = useContext(AuthContext);
  const { getAllScreenData } = useContext(PersonalContext);
  const route = useRoute<RouteProp<PersonalParamList, 'Item'>>();
  const { item } = route.params;

  const deleteData = (id: number) => {
    axios.delete(`http://192.168.0.181:5000/personal/delete/${id}`);
    setPersonData((prev) => prev.filter((item) => item.id !== id));
    getAllScreenData();
  };

  useEffect(() => {
    axios
      .post(`http://192.168.0.181:5000/personal/getall`, {
        email: user?.email,
        remitter: item.remitter,
      })
      .then((item) => {
        setPersonData(item.data.data);
      });
  }, []);

  return (
    <View style={styles.presonalItem}>
      <View style={styles.card}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#ffffff',
            marginVertical: 5,
          }}
        >
          ₹{item.amount}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: '#ffffff',
            marginVertical: 5,
            textTransform: 'capitalize',
          }}
        >
          {item.amount > 0 ? 'from' : 'to'} {item.remitter}
        </Text>
      </View>

      <View style={styles.list}>
        <FlatList
          data={personData}
          renderItem={(itemData) => (
            <Item itemData={itemData.item} deleteData={deleteData} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  presonalItem: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    alignItems: 'center',
  },

  card: {
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    backgroundColor: '#222222',
    height: 150,
    width: 300,
    borderRadius: 8,
  },

  list: {
    width: 320,
  },

  item: {
    marginVertical: 5,
    height: 55,
    width: '100%',
    // backgroundColor: '#222222',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAmount: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemNote: {
    width: '65%',
    alignItems: 'flex-start',
  },
  itemDelete: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#7B7B7B',
    // backgroundColor: '#D90024',
  },

  text: {
    color: '#ffffff',
  },
});
