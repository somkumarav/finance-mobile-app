import { createContext, useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider';

interface PersonalProvider {
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

export const PersonalContext = createContext<{
  allData: Data[];
  getAllData: () => void;
  addData: (modalData: { to: string; note: string; amount: string }) => void;
  deleteData: (id: number) => void;
}>({
  allData: [],
  getAllData: () => {},
  addData: () => {},
  deleteData: () => {},
});

export const DailyProvider: React.FC<PersonalProvider> = ({ children }) => {
  const [allData, setAllData] = useState<Data[]>([]);
  const { user } = useContext(AuthContext);

  return (
    <PersonalContext.Provider
      value={{
        allData,
        getAllData: async () => {},
        addData: async () => {},
        deleteData: async (id) => {},
      }}
    >
      {children}
    </PersonalContext.Provider>
  );
};
