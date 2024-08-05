const mongoose = require('mongoose');
const Wallet = require('../models/Wallet');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        async function createWallet(address) {
            try {
                const wallet = new Wallet({ address });
                await wallet.save();
                console.log('Wallet created:', wallet);
            } catch (error) {
                console.error('Error creating wallet:', error);
            }
        }

        // Usage
        createWallet('0x1234567890abcdef1234567890abcdef12345678');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
