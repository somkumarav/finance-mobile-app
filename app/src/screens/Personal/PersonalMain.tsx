import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PersonalParamList } from './Personal';

interface PersonalMain {
  allData: {
    amount: number;
    remitter: string;
  }[];
  navigation: NativeStackNavigationProp<PersonalParamList, 'All', undefined>;
}

interface Item {
  itemData: ListRenderItemInfo<{
    amount: number;
    remitter: string;
  }>;
  navigation: NativeStackNavigationProp<PersonalParamList, 'All'>;
}

const Item: React.FC<Item> = ({ itemData, navigation }) => {
  return (
    <Pressable
      android_ripple={{ color: '#566573' }}
      style={styles.listItem}
      onPress={() => {
        navigation.navigate('Item', {
          item: itemData.item,
        });
      }}
    >
      <View style={styles.itemImage}>
        <View style={[styles.icon, { backgroundColor: '#111111' }]}>
          <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
            {itemData.item.remitter.toString().substring(0, 1)}
          </Text>
        </View>
      </View>
      <View style={styles.itemMain}>
        <Text style={styles.noteText}>{itemData.item.remitter}</Text>
        {/* <Text style={[styles.noteText, { opacity: 0.4, fontSize: 14 }]}>
          {itemData.item.date}
        </Text> */}
      </View>

      <View style={styles.itemAmount}>
        <Text style={styles.amountText}>{itemData.item.amount}</Text>
      </View>
    </Pressable>
  );
};

export const PersonalMain: React.FC<PersonalMain> = ({
  allData,
  navigation,
}) => {
  const sumAllTransactions = () => {
    let sum = 0;
    allData.forEach((item) => {
      sum = sum + item.amount;
    });
    return sum;
  };
  return (
    <View style={styles.DailyMain}>
      <View style={styles.card}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          ₹{sumAllTransactions()}
        </Text>
      </View>
      <View style={styles.dailyList}>
        <FlatList
          data={allData}
          renderItem={(itemData) => (
            <Item itemData={itemData} navigation={navigation} />
          )}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  DailyMain: {
    flex: 1,
    paddingHorizontal: 15,
  },

  card: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dailyList: {
    flex: 1,
  },

  listItem: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemMain: {
    flex: 1,
    paddingHorizontal: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  itemAmount: {
    width: '15%',
  },

  noteText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'right',
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    // borderRadius: 100 / 2,
    borderRadius: 50,
  },
});
