import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const TwitterLogin = () => {
  const [walletPublicKey, setWalletPublicKey] = useState(null);

  const handleLogin = async () => {
    console.log('Login button pressed');
    const redirectUri = 'http://192.168.1.113:3000/auth/twitter/callback';
    console.log('Redirect URI:', redirectUri);
    const authUrl = `http://192.168.1.113:3000/auth/twitter?redirect_uri=${encodeURIComponent(redirectUri)}`;
    console.log('Auth URL:', authUrl);

    try {
      console.log('Opening WebBrowser...');
      const result = await WebBrowser.openAuthSessionAsync(authUrl);
      console.log('WebBrowser result:', JSON.stringify(result, null, 2));
      
      if (result.type === 'success') {
        console.log('Login successful, parsing result...');
        const { code } = Object.fromEntries(new URLSearchParams(result.url.split('?')[1]));
        
        try {
          const response = await fetch(`http://192.168.1.113:3000/auth/twitter/callback?code=${code}`);
          const data = await response.json();
          if (data.success && data.wallet) {
            setWalletPublicKey(data.wallet);
            console.log('Wallet public key:', data.wallet);
          } else {
            console.error('Error creating wallet:', data.error, data.details);
          }
        } catch (error) {
          console.error('Error fetching wallet information:', error);
        }
      } else {
        console.log('Login not successful, result type:', result.type);
      }
    } catch (error) {
      console.error('Error during Twitter login:', error);
    }
  };

  return (
    <View>
      <Button title="Login with Twitter" onPress={handleLogin} />
      {walletPublicKey && (
        <Text>Your Solana wallet public key: {walletPublicKey}</Text>
      )}
    </View>
  );
};

export default TwitterLogin;