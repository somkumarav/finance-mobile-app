import Express from 'express';
import cors from 'cors';

import User from './Routes/User';
import DailyTransactions from './Routes/DailyTransactions';
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
const app = Express();
app.use(cors());
app.use(Express.json());
app.use(User);
app.use(DailyTransactions);

export interface Response {
  status: 'success' | 'unsuccessful';
  msg: string;
  data?: any;
}

app.get('/hello', (_req, res) => {
  console.log('hello');
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`server started at 5000`);
});
