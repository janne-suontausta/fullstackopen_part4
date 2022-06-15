const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

const url = config.MONGODB_URI;

logger.info('connecting', url);
mongoose.connect(url)
    .then(() => {
        logger.info('Connected to the database');
    })
    .catch(() => {
        logger.error('Database connection failed');
        logger.error(url);
    });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

module.exports = app;
