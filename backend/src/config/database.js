import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstantce = await mongoose.connect
            (`${process.env.MONGODB_URI}`)
            console.log('MongoDB connected successfully');
            console.log(`${connectionInstantce.connection.host} ${connectionInstantce.connection.name}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

export default connectDB;