import axios from 'axios';
import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider';
import { getRandomColor } from '../../components/Register';

export const ipAddress = '192.168.0.181';
const url = 'http://192.168.0.181:5000';

interface DailyProvider {
  children: React.ReactNode;
}

interface Data {
  id: number;
  amount: number;
  date: string;
  email: string;
  note: string;
  payee: string;
  remitter: string;
}

export const DailyContext = createContext<{
  allData: Data[];
  getAllData: () => void;
  addData: (modalData: { to: string; note: string; amount: string }) => void;
  deleteData: () => void;
}>({
  allData: [],
  getAllData: () => {},
  addData: () => {},
  deleteData: () => {},
});

export const DailyProvider: React.FC<DailyProvider> = ({ children }) => {
  const [allData, setAllData] = useState<Data[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .post(`http://${ipAddress}:5000/daily/getall`, {
        email: user?.email,
      })
      .then((item) => {
        setAllData(item.data.data);
      });
  }, []);

  return (
    <DailyContext.Provider
      value={{
        allData,
        getAllData: async () => {
          await axios
            .post(`http://${ipAddress}:5000/daily/getall`, {
              email: user?.email,
            })
            .then((item) => {
              setAllData(item.data.data);
            });
        },

        addData: async (modalData) => {
          await axios
            .post(`http://${ipAddress}:5000/daily/add`, {
              email: user?.email,
              payee: getRandomColor(),
              remitter: modalData.to,
              note: modalData.note,
              amount: parseInt(modalData.amount),
            })
            .then((item) => {
              setAllData([...allData, item.data.data]);
              console.log(item.data.data);
            });
        },
        deleteData: () => {},
      }}
    >
      {children}
    </DailyContext.Provider>
  );
};
