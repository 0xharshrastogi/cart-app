import debug from 'debug';
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/cartDB';

const log = debug('mongoose');

export const connectDB = mongoose
  .connect(MONGO_URI)
  .then(() => log('connected to mongo db'));
