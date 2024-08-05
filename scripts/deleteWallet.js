const mongoose = require('mongoose');
const Wallet = require('../models/Wallet');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        async function deleteWallet(address) {
            try {
                const result = await Wallet.deleteOne({ address });
                if (result.deletedCount > 0) {
                    console.log('Wallet deleted');
                } else {
                    console.log('Wallet not found');
                }
            } catch (error) {
                console.error('Error deleting wallet:', error);
            }
        }

        // Usage
        deleteWallet('0x1234567890abcdef1234567890abcdef12345678');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
