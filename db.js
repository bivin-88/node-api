const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_DB_URL || 'mongodb://mongo:27017/node-api';

const connectWithRetry = () => {
  console.log('⏳ Attempting MongoDB connection...');
  return mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = connectWithRetry;

