import express from 'express';
import cors from 'cors';
import feedbackRoutes from './routes/feedback.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Setup middleware & routes
app.use(cors());
app.use(express.json());
app.use('/api/feedback', feedbackRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
