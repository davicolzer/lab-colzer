import express from 'express';
import { authRoute } from './auth.route';
import { userRoute } from './user.route';
import { sampleRoute } from './sample.route';

const router = express();
router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/sample', sampleRoute);

export { router };
