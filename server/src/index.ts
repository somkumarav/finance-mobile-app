import Express from 'express';

import { pool } from './db';
import User from './Routes/User';

const app = Express();
app.use(Express.json());

app.use(User);

export interface Response {
  status: 'success' | 'unsuccessful';
  msg: string;
  data?: any;
}

//ROUTES
app.post('/account/register', async (req, res) => {
  const { name, email, password, color } = req.body;
  const newAccount = await pool.query(
    'insert into accounts (name, email, password, color) values ($1, $2, $3, $4);',
    [name, email, password, color]
  );
  console.log(newAccount);
  res.send(`hello ${req.body.name}`);
  try {
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/account/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const checkAccount = await pool.query(
      'select * from accounts where email=$1',
      [email]
    );
    console.log(checkAccount);
    res.send('hello');
  } catch (err) {
    console.log(err.msg);
  }
});

// app.get('/account/get/:id', async (_req, res) => {
//   try {
//     const getAccount = await pool.query(
//       "select * from accounts where email='beb@gmai.com';"
//     );
//     const { id, name, email } = getAccount.rows[0];
//     const accoutn = { id, name, email };
//     res.send(accoutn);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(5000, () => {
  console.log('server started at http://localhost:5000');
});
