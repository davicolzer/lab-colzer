import express from 'express';
import { userController } from '../../../modules';

const userRoute = express();

userRoute.post('/create', userController.createOne);

export { userRoute }