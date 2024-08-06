import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DM_NAME,
    });
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.log('MongoDB Not Connected ' + error);
  }
};

export default connectDB;
