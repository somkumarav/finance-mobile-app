import Express from 'express';
import { pool } from '../db';
import { Response } from '../index';

const router = Express.Router();
router.get('/account/get/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool
      .query('select * from accounts where id=$1', [id])
      .then((item) => {
        const { id, name, email, color } = item.rows[0];
        const user = { id, name, email, color };

        const response: Response = {
          status: 'success',
          msg: 'user found',
          data: user,
        };
        res.send(response);
      })
      .catch(() => {
        const response: Response = {
          status: 'unsuccessful',
          msg: 'user not found',
        };
        res.send(response);
      });
  } catch (err) {
    console.log(err);
    const response: Response = {
      status: 'unsuccessful',
      msg: 'something went wrong',
    };
    res.send(response);
  }
});

router.post('/account/register', async (req, res) => {
  try {
    const { name, email, password, color } = req.body;

    const checkForAccount = await pool.query(
      'select * from accounts where email=$1',
      [email]
    );

    if (checkForAccount.rowCount !== 0) {
      const response: Response = {
        status: 'unsuccessful',
        msg: 'user already exist',
      };
      res.send(response);
    } else {
      await pool
        .query(
          'insert into accounts (name, email, password, color) values ($1, $2, $3, $4);',
          [name, email, password, color]
        )
        .then(() => {
          const response: Response = {
            status: 'success',
            msg: 'user registred successfully',
          };
          res.send(response);
        })
        .catch((err) => {
          const response: Response = {
            status: 'unsuccessful',
            msg: err.message,
          };
          res.send(response);
        });
    }
  } catch (err) {
    console.log(err);
    const response: Response = {
      status: 'unsuccessful',
      msg: 'something went wrong',
    };
    res.send(response);
  }
});

router.post('accounts/login', async (req, res) => {});

export default router;
