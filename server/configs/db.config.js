import mysql from 'mysql2';

// const connectDB = mysql.createConnection({
//   host: 'mysql',
//   port: '3306',
//   user: 'root',
//   password: '123456',
//   database: 'testdb',
// });

const connectDB = mysql.createPool({
  host: 'mysql',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'testdb',
  connectionLimit: 10,
});

// connectDB.connect(function (err) {
//   if (err) {
//     console.error('error connect to MySql');
//     return;
//   }

//   console.log('success connect to MySql');
// });

// const executeQuery = (query, arrayParams = []) => {
//   return new Promise((resolve, reject) => {
//     try {
//       //console.log(arrayParams);
//       connectDB.query(query, arrayParams, (err, data) => {
//         if (err) {
//           console.log('error query' + query);
//           reject(err);
//         }
//         resolve(data);
//       });
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

export default connectDB; //executeQuery;
