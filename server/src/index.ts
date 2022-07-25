import Express from 'express';
import cors from 'cors';

import User from './Routes/User';
import DailyTransactions from './Routes/DailyTransactions';
import PersonalTransactions from './Routes/PersonalTransactions';

const PORT = process.env.PORT || 5000;

// MIDDLEWARES
const app = Express();
app.use(cors());
app.use(Express.json());
app.use(User);
app.use(DailyTransactions);
app.use(PersonalTransactions);

export interface Response {
  status: 'success' | 'unsuccessful';
  msg: string;
  data?: any;
}

export const getDateFormated = () => {
  const currentTime = new Date();
  return `${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()} ${currentTime.toLocaleTimeString(
    'en-IN',
    {
      timeStyle: 'medium',
    }
  )}`;

  // return `${currentTime.toLocaleString('en-IN', {
  //   dateStyle: 'medium',
  // })}, ${currentTime.toLocaleString('en-IN', {
  //   weekday: 'short',
  // })} ${currentTime.toLocaleString('en-IN', {
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   hour12: true,
  // })}`;
};

app.get('/hello', (_req, res) => {
  res.send(`Hello it's ${getDateFormated()}`);
});

app.listen(PORT, () => {
  console.log(`server started at 5000`);
});
