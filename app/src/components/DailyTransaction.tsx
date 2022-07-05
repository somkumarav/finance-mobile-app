import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { AuthContext } from '../AuthProvider';
import { DailyMain } from './DailyMain';
import { getRandomColor } from './Register';

type User = {
  id: number;
  name: string;
  email: string;
  color: string;
};

interface DailyHeader {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Modal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAllData: React.Dispatch<React.SetStateAction<any>>;
}

const DailyHeader: React.FC<DailyHeader> = ({ setShowModal }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.header}>
      <Pressable onPress={logout}>
        <View style={[styles.icon, { backgroundColor: user?.color }]}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {user?.name.substring(0, 1)}
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <Text style={{ color: '#ffffff', fontSize: 40 }}>+</Text>
      </Pressable>
    </View>
  );
};

const Modal: React.FC<Modal> = ({ setShowModal, setAllData }) => {
  const [modalData, setModalData] = useState({ to: '', note: '', amount: 0 });

  const { user } = useContext(AuthContext);

  const handleAdd = async () => {
    setShowModal((prev) => !prev);
    await axios
      .post('http://192.168.0.181:5000/daily/add', {
        email: user?.email,
        payee: getRandomColor(),
        remitter: modalData.to,
        note: modalData.note,
        amount: modalData.amount,
        date: '12 Feb 2022, Mon 12:52 PM',
      })
      .then((item) => {
        setAllData((prev: any) => [...prev, item.data.data]);
        console.log(item.data.data);
      });
  };

  return (
    <View style={modalStyles.modalContainer}>
      <View style={modalStyles.modalContent}>
        <View style={modalStyles.textInputBox}>
          <TextInput
            value={modalData.to}
            onChangeText={(text) => {
              setModalData({ ...modalData, to: text });
            }}
            placeholder="To"
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={{ color: '#ffffff' }}
          />
        </View>

        <View style={modalStyles.textInputBox}>
          <TextInput
            value={modalData.note}
            onChangeText={(text) => {
              setModalData({ ...modalData, note: text });
            }}
            placeholder="Note"
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={{ color: '#ffffff' }}
          />
        </View>

        <View style={modalStyles.textInputBox}>
          <TextInput
            value={modalData.amount.toString()}
            onChangeText={(text) => {
              setModalData({ ...modalData, amount: parseInt(text) });
            }}
            placeholder="Amount"
            keyboardType="numbers-and-punctuation"
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={{ color: '#ffffff' }}
          />
        </View>

        <Pressable
          android_ripple={{ color: '#379DE0' }}
          style={modalStyles.button}
          onPress={handleAdd}
        >
          <Text style={{ color: '#ffffff' }}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const DailyTransactions = () => {
  const [allData, setAllData] = useState([]);
  const [showModal, setShowModal] =
    useState<React.SetStateAction<boolean>>(false);
  const { user } = useContext(AuthContext);

  const getAllData = async () => {
    await axios
      .post('http://192.168.0.181:5000/daily/getall', {
        email: user?.email,
      })
      .then((item) => {
        setAllData(item.data.data);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <View style={styles.DailyTransactions}>
      {showModal && (
        <Modal setShowModal={setShowModal} setAllData={setAllData} />
      )}
      <DailyHeader setShowModal={setShowModal} />
      <DailyMain allData={allData} />
    </View>
  );
};

const styles = StyleSheet.create({
  DailyTransactions: {
    flex: 1,
    backgroundColor: '#2d2d2d',
  },

  header: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '10%',
    paddingHorizontal: 15,
  },

  icon: {
    height: 50,
    width: 50,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const modalStyles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  modalContent: {
    height: '30%',
    width: '80%',
    paddingVertical: 100,
    borderRadius: 10,
    backgroundColor: '#2d2d2d',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInputBox: {
    height: 30,
    width: 200,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 5,
  },
  button: {
    width: 200,
    height: 35,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#2980B9',
  },
});
