import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        app.on("error", (error) => {
            console.error('Server error:', error.message);
            throw error;
        });

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
        await connectDB();
    } catch (error) {
        console.error('Error starting the server:', error.message);
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

startServer();