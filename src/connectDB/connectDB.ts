import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config'; 
import { Injectable, Logger } from '@nestjs/common';
const logger = new Logger("connectDB");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DM_NAME,
    });
    logger.log('MongoDB Connected Successfully');
  } catch (error) {
    logger.log('MongoDB Not Connected ' + error);
  }
};

export default connectDB;