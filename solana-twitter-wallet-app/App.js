import './global';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TwitterLogin from './components/TwitterLogin';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solana Wallet with Twitter Login</Text>
      <TwitterLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
