import express from 'express';
import db from './config/Database.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import User from './models/UserModel.js';

import userRouter from './routes/UserRoute.js';
import authRouter from './routes/AuthRoute.js';

dotenv.config()
const app = express();

// Cek koneksi database
try {
  await db.authenticate();
  console.log('Database connected');
  // Generate tabel di database
  // await User.sync()

} catch (error) {
  console.error(error);
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json());
app.use(cookieParser())
app.use(userRouter);
app.use(authRouter);



// Tentukan port untuk server Express
app.listen(4000, () => console.log("Server running at port 4000"));