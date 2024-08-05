const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Define Wallet Schema
const walletSchema = new mongoose.Schema({
  address: { type: String, required: true }
});

const Wallet = mongoose.model('Wallet', walletSchema);

// Routes
app.post('/create-wallet', async (req, res) => {
  try {
    const wallet = ethers.Wallet.createRandom();
    const newWallet = new Wallet({ address: wallet.address });
    await newWallet.save();
    res.json({ address: wallet.address });
  } catch (error) {
    res.status(500).send('Error creating wallet.');
  }
});

app.post('/send-token', async (req, res) => {
  const { toAddress, amountInEther } = req.body;
  try {
    // Initialize provider and signer
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
    const privateKey = process.env.PRIVATE_KEY; // Use the private key of the sender's wallet
    const signer = new ethers.Wallet(privateKey, provider);

    // Send transaction
    const tx = {
      to: toAddress,
      value: ethers.utils.parseEther(amountInEther)
    };
    const txResponse = await signer.sendTransaction(tx);
    await txResponse.wait(); // Wait for transaction to be mined
    res.json({ status: 'Transaction successful', txHash: txResponse.hash });
  } catch (error) {
    res.status(500).send('Error sending transaction.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
