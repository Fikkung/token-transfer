const mongoose = require('mongoose');
const Wallet = require('../models/Wallet');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        async function getWalletByAddress(address) {
            try {
                const wallet = await Wallet.findOne({ address });
                if (wallet) {
                    console.log('Wallet found:', wallet);
                } else {
                    console.log('Wallet not found');
                }
            } catch (error) {
                console.error('Error fetching wallet:', error);
            }
        }

        // Usage
        getWalletByAddress('0x1234567890abcdef1234567890abcdef12345678');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
