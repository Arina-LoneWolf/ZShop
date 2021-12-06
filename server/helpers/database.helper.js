import connectDB from '../configs/db.config.js';

const executeQuery = (query, arrayParams = []) => {
  return new Promise((resolve, reject) => {
    try {
      //console.log(arrayParams);
      connectDB.query(query, arrayParams, (err, data) => {
        if (err) {
          console.log('error query' + query);
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export { executeQuery };
