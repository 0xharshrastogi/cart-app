import { MONGO_CONNECTION_URI } from './config';
import { connect } from './db/connect';

const initServer = () => {
  console.log('server');
};

connect(MONGO_CONNECTION_URI).then(() => initServer());
