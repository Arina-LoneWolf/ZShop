import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
//import executeQuery from './configs/db.config.js';
import routerRoot from './routers/root.router.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//connectDB.connect();

app.use('/api', routerRoot);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
