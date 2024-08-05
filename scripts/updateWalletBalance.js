const mongoose = require('mongoose');
const Wallet = require('../models/Wallet');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        async function updateWalletBalance(address, newBalance) {
            try {
                const wallet = await Wallet.findOneAndUpdate(
                    { address },
                    { balance: newBalance },
                    { new: true } // Return the updated document
                );
                if (wallet) {
                    console.log('Wallet updated:', wallet);
                } else {
                    console.log('Wallet not found');
                }
            } catch (error) {
                console.error('Error updating wallet balance:', error);
            }
        }

        // Usage
        updateWalletBalance('0x1234567890abcdef1234567890abcdef12345678', 100);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
