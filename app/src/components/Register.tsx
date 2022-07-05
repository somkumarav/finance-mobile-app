import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AuthParamList } from '../AuthParamList';
import { AuthContext } from '../AuthProvider';

const colors = [
  '#922B21',
  '#B03A2E',
  '#76448A',
  '#6C3483',
  '#1F618D',
  '#2874A6',
  '#148F77',
  '#117A65',
  '#1E8449',
  '#239B56',
  '#616A6B',
  '#283747',
];

export const getRandomColor = () => {
  const random = Math.round(Math.random() * colors.length);
  return colors[random];
};

export const Register = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthParamList, 'Register'>;
}) => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const { register } = useContext(AuthContext);

  const handleRegister = () => {
    if (
      user.name.length > 2 &&
      user.email.length > 5 &&
      user.password.length > 5
    ) {
      register(user.name, user.email, user.password, getRandomColor());
    } else {
      console.log('enter valid login info');
    }
  };

  return (
    <View style={styles.register}>
      <Text style={styles.title}>Register</Text>

      <View style={styles.textInputBox}>
        <TextInput
          value={user.name}
          onChangeText={(text) => {
            setUser({ ...user, name: text });
          }}
          placeholder="Enter your name"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={{ color: '#ffffff' }}
        />
      </View>

      <View style={styles.textInputBox}>
        <TextInput
          value={user.email}
          onChangeText={(text) => {
            setUser({ ...user, email: text });
          }}
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={{ color: '#ffffff' }}
        />
      </View>

      <View style={styles.textInputBox}>
        <TextInput
          value={user.password}
          onChangeText={(text) => {
            setUser({ ...user, password: text });
          }}
          placeholder="Enter your password"
          secureTextEntry={true}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={{ color: '#ffffff' }}
        />
      </View>

      <Pressable
        android_ripple={{ color: '#379DE0' }}
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
          Create Account
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text
          style={{
            marginTop: 10,
            color: '#379DE0',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}
        >
          Go to Sign In
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  register: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2b2b2b',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2980B9',
  },

  textInputBox: {
    width: 250,
    height: 45,
    marginVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255,0.5)',
    borderRadius: 5,
  },

  button: {
    width: 250,
    height: 45,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#2980B9',
  },
});
