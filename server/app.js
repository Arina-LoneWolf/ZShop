const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./configs/connectDB');
const route = require('./routers/root.router');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
//app.use(express.urlencoded({ extended: false }));

route(app);

db.connectDB;

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
