import express from 'express';

import { MONGO_CONNECTION_URI, PORT } from './config';
import { connect } from './db/connect';
import { DebugLogger } from './helpers/Logger';
import { router as auth } from './routes/auth';

const initServer = () => {
  const logger = DebugLogger.create('app');
  const app = express();

  app.use(express.json());

  app.use('/api', auth);

  app.listen(PORT, () => {
    logger.log(`listening on port ::${PORT}`);
  });
};

connect(MONGO_CONNECTION_URI).then(() => initServer());
