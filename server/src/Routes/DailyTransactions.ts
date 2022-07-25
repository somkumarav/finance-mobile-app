import Express from 'express';
import { pool } from '../db';
import { getDateFormated, Response } from '../index';

const router = Express.Router();

// Add A Transaction
router.post('/daily/add', async (req, res) => {
  try {
    const { email, payee, remitter, note, amount } = req.body;
    const date = getDateFormated();
    await pool
      .query(
        'insert into daily_transactions (email, payee, remitter, note, amount, date) values ($1, $2, $3, $4, $5, $6) returning *',
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

// Get A Transaction
router.get('/daily/get/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('hello', id);
    await pool
      .query('select * from daily_transactions where id=$1', [id])
      .then((item) => {
        const response: Response = {
          status: 'success',
          msg: 'item retrived',
          data: item.rows[0],
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

// Update a Transaction

// Delete a Transaction
router.delete('/daily/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('delete from daily_transactions where id=$1', [id]);
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

// Get All Transaction
router.post('/daily/getall', async (req, res) => {
  try {
    const { email } = req.body;
    await pool
      .query('select * from daily_transactions where email=$1', [email])
      .then((item) => {
        const response: Response = {
          status: 'success',
          msg: 'all items retrived',
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

export default router;
