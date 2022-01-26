import mysql from 'mysql';

import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection((err, connection) => {
  //   if (err) throw err;

  if (err) {
    console.error('error connecting: ', err);
    return;
  }

  connection.release();
  console.log('DB is connected');
});

export default pool;
