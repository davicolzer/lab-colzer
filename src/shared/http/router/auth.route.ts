import express from 'express';
import { authController } from '../../../modules';

const authRoute = express();

authRoute.post('/login', authController.login);

export { authRoute }