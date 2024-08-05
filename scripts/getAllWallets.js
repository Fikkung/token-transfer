const mongoose = require('mongoose');
const Wallet = require('../models/Wallet');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        async function getAllWallets() {
            try {
                const wallets = await Wallet.find();
                console.log('All wallets:', wallets);
            } catch (error) {
                console.error('Error fetching wallets:', error);
            }
        }

        // Usage
        getAllWallets();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
