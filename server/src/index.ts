import Express from 'express';

import User from './Routes/User';
import DailyTransactions from './Routes/DailyTransactions';

// MIDDLEWARES
const app = Express();
app.use(Express.json());
app.use(User);
app.use(DailyTransactions);

export interface Response {
  status: 'success' | 'unsuccessful';
  msg: string;
  data?: any;
}

app.listen(5000, () => {
  console.log('server started at http://localhost:5000');
});
