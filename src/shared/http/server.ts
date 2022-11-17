import express from 'express';
import { SERVER_PORT } from '../../constants';
import { mongodb } from '../infra/mongoose';
import { router } from './router';

const app = express();

app.use(express.json());

app.use(router)

app.listen(SERVER_PORT, async () => {
  console.log(`Server Started`);

  await mongodb.connect().then(()=>{
    console.log('Database Connected')
  }).catch(()=>{
    console.log('Error to Connect Database')
  })
});
