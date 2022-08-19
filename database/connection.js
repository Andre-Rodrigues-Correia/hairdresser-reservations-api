const mongoose = require('mongoose');

require('dotenv').config()
const DB_USER = process.env.DB_USER;
const DB_PASS =  encodeURIComponent(process.env.DB_PASS)


const { MongoMemoryServer } = require('mongodb-memory-server');
let mongod = null;


const connectDB = async () => {
    try {
      let dbUrl = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.idgbyqs.mongodb.net/?retryWrites=true&w=majority`;
      if (process.env.NODE_ENV === 'test') {
        mongod = await MongoMemoryServer.create();
        dbUrl = mongod.getUri();
      }
  
      const conn = await mongoose.connect(dbUrl);
  
  
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };
  


const disconnectDB = async () => {
    try {
      await mongoose.connection.close();
      if (mongod) {
        await mongod.stop();
      }
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };


module.exports = { connectDB, disconnectDB };