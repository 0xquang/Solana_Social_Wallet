// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const { Connection, Keypair } = require('@solana/web3.js');
//const bs58 = require('bs58');

// Initialize Express app
const app = express();
app.use(express.json());

// Get Twitter OAuth credentials from environment variables
const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const TWITTER_REDIRECT_URI = process.env.TWITTER_REDIRECT_URI;

// Endpoint to initiate Twitter OAuth flow
app.get('/auth/twitter', (req, res) => {
  console.log('Received request for Twitter auth');
  console.log('Query parameters:', req.query);
  const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.TWITTER_REDIRECT_URI)}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
  console.log('Redirecting to:', authUrl);
  res.redirect(authUrl);
});

// Callback endpoint for Twitter OAuth
app.get('/auth/twitter/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    console.error('No code received from Twitter');
    return res.status(400).json({ error: 'No code received from Twitter' });
  }

  try {
    console.log('Exchanging code for access token');
    const tokenResponse = await axios.post('https://api.twitter.com/2/oauth2/token', 
      new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        client_id: process.env.TWITTER_CLIENT_ID,
        redirect_uri: process.env.TWITTER_REDIRECT_URI,
        code_verifier: 'challenge' // This should match the code_challenge sent in the initial request
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString('base64')}`
        }
      }
    );

    const { access_token } = tokenResponse.data;
    console.log('Access token received');

    console.log('Creating Solana wallet...');
    const wallet = await createAndStoreWallet(access_token);
    const publicKeyBase58 = wallet.publicKey.toBase58(); // Use toBase58() instead of bs58.encode
    console.log('Solana wallet created successfully. Public key:', publicKeyBase58);

    res.json({ success: true, wallet: publicKeyBase58 });
  } catch (error) {
    console.error('Error in Twitter callback:', error);
    res.status(500).json({ error: 'Authentication failed', details: error.message });
  }
});

// Function to create and store a Solana wallet
async function createAndStoreWallet(accessToken) {
  const wallet = Keypair.generate();
  // If you need to encode the private key, use Buffer instead of bs58
  const encodedPrivateKey = Buffer.from(wallet.secretKey).toString('base64');
  // ... rest of your wallet storage logic
  return wallet;
}

// Function to encrypt the private key
function encryptPrivateKey(privateKey) {
  // Assuming privateKey is a Uint8Array or Buffer
  const privateKeyString = Buffer.from(privateKey).toString('base64');
  // ... rest of your encryption logic
}

// Function to store the encrypted wallet (placeholder)
async function storeEncryptedWallet(accessToken, encryptedWallet) {
  // TODO: Implement your own storage solution here (e.g., database, cloud storage)
  console.log('Storing encrypted wallet for user with access token:', accessToken);
  console.log('Encrypted wallet:', encryptedWallet);
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});