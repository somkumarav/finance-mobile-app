import Express from 'express';
import { Response } from '..';
import { pool } from '../db';
import { getDateFormated } from '../index';

const router = Express.Router();

router.post('/personal/add', async (req, res) => {
  try {
    const { email, payee, remitter, note, amount } = req.body;
    const date = getDateFormated();
    // const date = '2022-08-1 00:00:00';
    console.log(date);
    await pool
      .query(
        'insert into transactions (email, payee, remitter, note, amount, date) values ($1, $2, $3, $4, $5, $6) returning *',
        [email, payee, remitter, note, amount, date]
      )
      .then((item) => {
        const response: Response = {
          status: 'success',
          msg: 'item added',
          data: item.rows[0],
        };
        res.send(response);
      })
      .catch((err) => {
        console.log(err);
        const response: Response = {
          status: 'unsuccessful',
          msg: err.message,
        };
        res.send(response);
      });
  } catch (err) {
    const response: Response = {
      status: 'unsuccessful',
      msg: err.message,
    };
    res.send(response);
  }
});

router.post('/personal/getall', async (req, res) => {
  try {
    const { email, remitter } = req.body;
    console.log('hello', email, remitter);
    await pool
      .query(
        `select id, amount, email, note, payee, remitter, to_char(date, 'DD mon YYYY, Dy HH:MM AM') as date from transactions where email=$1 and remitter=$2`,
        [email, remitter]
      )
      .then((item) => {
        const response: Response = {
          status: 'success',
          msg: 'item added',
          data: item.rows,
        };
        console.log(response);
        res.send(response);
      });
  } catch (err) {
    const response: Response = {
      status: 'unsuccessful',
      msg: err.message,
    };
    res.send(response);
  }
});

router.get('/personal/get/:email', async (req, res) => {
  try {
    const { email } = req.params;
    await pool
      .query(
        'select remitter, cast(sum(amount) as integer) as amount from transactions where email=$1 group by remitter;',
        [email]
      )
      .then((item) => {
        const response: Response = {
          status: 'success',
          msg: 'item retrived',
          data: item.rows,
        };
        res.send(response);
      });
  } catch (err) {
    const response: Response = {
      status: 'unsuccessful',
      msg: err.message,
    };
    res.send(response);
  }
});

router.delete('/personal/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('delete from transactions where id=$1', [id]);
    const response: Response = {
      status: 'success',
      msg: 'item deleted',
    };
    res.send(response);
  } catch (err) {
    const response: Response = {
      status: 'unsuccessful',
      msg: err.message,
    };
    res.send(response);
  }
});

export default router;
