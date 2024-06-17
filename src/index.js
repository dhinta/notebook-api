import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.js';
import noteRouter from './routes/note.js';
import db from './config/db.js';
import 'dotenv/config';
import { verifyUser } from './middleware/verify-user.js';

const app = express();
app.use(
  cors({
    origin: 'http://localhost',
    allowedHeaders: ['Authorization', 'Content-Type'],
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter);
app.use('/notes', verifyUser, noteRouter);

app.route('/').get((req, res) => {
  res.status(404).end();
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => console.log('Connected successfully'));
});
