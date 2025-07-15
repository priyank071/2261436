require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.use((err, req, res, next) => {
  logger.error('server', `Unhandled error: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  logger.info('server', `Server running on port ${PORT}`);
});