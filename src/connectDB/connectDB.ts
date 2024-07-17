import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

const connectDB = async () => {
  try {
    const configService = new ConfigService();
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DM_NAME,
    });
    console.log('MongoDB Connected 2  Successfully');
  } catch (error) {
    console.log('MongoDB Not Connected 2 ' + error);
  }
};

export default connectDB;
