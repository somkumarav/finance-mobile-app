import { useContext } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthParamList } from '../AuthParamList';
import { AuthContext } from '../AuthProvider';

export const Login = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthParamList, 'Register'>;
}) => {
  const { login } = useContext(AuthContext);

  return (
    <View style={styles.login}>
      <Text>Login</Text>

      <Pressable
        onPress={() => {
          login('bob@bob.com', 'test@bob.com');
        }}
      >
        <Text>log me in</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate('Register');
        }}
      >
        <Text>go to register</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
