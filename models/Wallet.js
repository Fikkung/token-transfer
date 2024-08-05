const Wallet = require('./models/Wallet');

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
