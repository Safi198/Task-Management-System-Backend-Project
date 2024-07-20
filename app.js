const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const swaggerDocs = require('./utils/swagger');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./config/winston');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

swaggerDocs(app);
app.use(errorHandler);

module.exports = app;
