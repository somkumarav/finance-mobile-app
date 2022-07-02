import { createContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type User = null | {
  id: number;
  name: string;
  email: string;
  color: string;
};

interface AuthProvider {
  children: React.ReactNode;
}

const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const AuthContext = createContext<{
  user: User;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    color: string
  ) => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then((item) => {
      setUser(JSON.parse(item!));
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: async (email: string, password: string) => {
          try {
            const res = await axios.post(
              'http://192.168.0.181:5000/account/login',
              {
                getemail: email,
                getpassword: password,
              }
            );
            showToast(res.data.msg);
            setUser(res.data.data);
            await AsyncStorage.setItem('user', JSON.stringify(res.data.data));
          } catch (err: any) {
            console.log(err.message);
            return null;
          }
        },

        register: async (
          name: string,
          email: string,
          password: string,
          color: string
        ) => {
          try {
            await axios
              .post('http://192.168.0.181:5000/account/register', {
                name,
                email,
                password,
                color,
              })
              .then((res) => {
                console.log(res.data);
                showToast(res.data.msg);
                setUser(res.data.data);
                AsyncStorage.setItem('user', JSON.stringify(res.data.data));
              });
          } catch (err) {
            console.log(err);
            setUser(null);
          }
        },

        logout: async () => {
          setUser(null);
          await AsyncStorage.removeItem('user');
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
