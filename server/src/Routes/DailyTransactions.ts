import Express from 'express';
import { pool } from '../db';
import { Response } from '../index';

const router = Express.Router();

// Add A Transaction
router.post('/daily/add', async (req, res) => {
  try {
    const { email, payee, remitter, note, amount, date } = req.body;
    await pool.query(
      'insert into daily_transactions (email, payee, remitter, note, amount, date) values ($1, $2, $3, $4, $5, $6)',
      [email, payee, remitter, note, amount, date]
    );
    const response: Response = {
      status: 'success',
      msg: 'item added',
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

// Get A Transaction
router.get('/daily/get/:id', async (req, res) => {
  try {
    const { id } = req.params;
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
router.get('/daily/getall', async (_req, res) => {
  try {
    await pool.query('select * from daily_transactions').then((item) => {
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
