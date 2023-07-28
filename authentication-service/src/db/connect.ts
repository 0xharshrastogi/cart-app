import mongoose from 'mongoose';
import { DebugLogger } from '../helpers/Logger';

const logger = DebugLogger.create('mongodb');

export const connect = async (dsn: string) => {
  try {
    await mongoose.connect(dsn);
    logger.log('connected to database');
  } catch (error) {
    logger.log('fail to connect database');
    console.error(error);
    process.exit(1);
  }
};
