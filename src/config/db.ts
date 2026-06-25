import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
       try {
              const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/riddhi_paali_db');
              console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
       } catch (error) {
              if (error instanceof Error) {
                     console.error(`❌ Error: ${error.message}`);
              } else {
                     console.error('❌ An unknown error occurred while connecting to MongoDB');
              }
              process.exit(1);
       }
};

export default connectDB;