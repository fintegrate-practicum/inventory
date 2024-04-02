import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: "inventoryDB",
        user: "m0548548312",
        // password: "password",
      });
      console.log('MongoDB Connected Successfully');
    } catch (error) {
      console.log(error+"dont connect");
    }
  };
  
  export default connectDB;
