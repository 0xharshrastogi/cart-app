import cors from 'cors';
import debug from 'debug';
import express from 'express';
import './db/mongoose';
import { cartRouter } from './routes/cart';
import { productRouter } from './routes/products';

const log = debug('main::application');

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/', cartRouter);
app.use('/api/', productRouter);

app.listen(PORT, () => {
  log(`listening on port ::${PORT}`);
});
