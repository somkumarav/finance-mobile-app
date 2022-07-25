import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider';

const url = 'http://192.168.0.181:5000';

interface PersonalProvider {
  children: React.ReactNode;
}

interface Data {
  amount: number;
  remitter: string;
}
export const PersonalContext = createContext<{
  allData: Data[];
  getAllScreenData: () => void;
  addData: (modalData: { to: string; note: string; amount: string }) => void;
}>({
  allData: [],
  getAllScreenData: () => {},
  addData: () => {},
});

export const PersonalProvider: React.FC<PersonalProvider> = ({ children }) => {
  const [allData, setAllData] = useState<Data[]>([]);
  const { user } = useContext(AuthContext);

  console.log(allData);

  useEffect(() => {
    axios.get(`${url}/personal/get/${user?.email}`).then((item) => {
      setAllData(item.data.data);
    });
  }, []);

  const getAllData = () => {
    axios.get(`${url}/personal/get/${user?.email}`).then((item) => {
      setAllData(item.data.data);
    });
  };
  return (
    <PersonalContext.Provider
      value={{
        allData,
        getAllScreenData: async () => {
          getAllData();
        },
        addData: async (data) => {
          axios
            .post(`${url}/personal/add`, {
              email: user?.email,
              payee: user?.name,
              remitter: data.to,
              note: data.note,
              amount: data.amount,
            })
            .then(() => {
              getAllData();
            });
        },
      }}
    >
      {children}
    </PersonalContext.Provider>
  );
};
