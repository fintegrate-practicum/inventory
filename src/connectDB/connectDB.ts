import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

const connectDB = async () => {
    try {
        const configService = new ConfigService();
        await mongoose.connect(configService.get<string>('MONGO_URI'), {
            dbName: configService.get<string>('DB_NAME'),
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.log("MongoDB Not Connected " + error);
    }
};

export default connectDB;
