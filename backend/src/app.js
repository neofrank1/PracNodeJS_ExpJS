import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Routes Import
import userRoutes from './routes/user.route.js';

app.use('/api/users', userRoutes);

export default app;