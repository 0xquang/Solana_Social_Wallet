# Solana_Social_Wallet
Creating Solana Wallet using Twitter

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Solana_Social_Wallet.git
   cd Solana_Social_Wallet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Twitter API credentials:
   a. Go to the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard) and sign in with your Twitter account.
   b. Create a new project and app if you haven't already.
   c. In your app settings, navigate to the "Keys and Tokens" tab.
   d. Generate and copy the following credentials:
      - API Key and API Key Secret
      - Access Token and Access Token Secret

4. Create a `.env` file in the root directory and add the following environment variables:
   ```bash
   TWITTER_API_KEY=your_twitter_api_key
   TWITTER_API_SECRET=your_twitter_api_secret
   TWITTER_ACCESS_TOKEN=your_twitter_access_token
   TWITTER_ACCESS_SECRET=your_twitter_access_secret
   SOLANA_RPC_URL=your_solana_rpc_url
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

## Additional Information

// Add any other relevant information about the project, its features, or how to use it.
