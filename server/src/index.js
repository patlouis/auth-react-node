import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import dotenv from 'dotenv';


const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

dotenv.config();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});