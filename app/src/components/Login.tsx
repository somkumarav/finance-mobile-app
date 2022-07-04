import { useContext, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AuthParamList } from '../AuthParamList';
import { AuthContext } from '../AuthProvider';

export const Login = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthParamList, 'Register'>;
}) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    if (user.email.length > 5 && user.password.length > 5) {
      login(user.email, user.password);
    } else {
      console.log('enter valid login info');
    }
  };

  return (
    <View style={styles.login}>
      <Text style={styles.title}>Login</Text>

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
        onPress={handleLogin}
      >
        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>sing in</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate('Register');
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
          Go to Register
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
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
