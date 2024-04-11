import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
export default async function axiosInstance(): Promise<any> {
    try {
        const URl = await axios.create({
            baseURL: process.env.BASE_URL,
        });
        return URl;
    } catch (error) {
        console.error(error);
        throw error;
    }
}