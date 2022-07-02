import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthParamList } from '../AuthParamList';
import { AuthContext } from '../AuthProvider';

export const Register = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthParamList, 'Register'>;
}) => {
  // const [user, setUser] = useState({
  //   name: 'beb',
  //   email: 'beb@bob.com',
  //   password: 'bob@bob.com',
  //   color: '#256E94',
  // });

  const { register } = useContext(AuthContext);

  return (
    <View style={styles.register}>
      <Text>Register</Text>
      <Pressable
        onPress={() => {
          register('ben', 'ben@bob.com', 'ben@bob.com', '#256E94');
        }}
      >
        <Text>Register me in</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text>go to login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  register: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
