import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Providers } from './src/Providers';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Providers />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
