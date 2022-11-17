import express from 'express';
import { checkTokenMiddle } from '../../../middlewares/auth';
import { sampleController } from '../../../modules';

const sampleRoute = express();

sampleRoute.post('/create', checkTokenMiddle, sampleController.createOne);
sampleRoute.get('/:sample', checkTokenMiddle, sampleController.findOne);
sampleRoute.get('/', checkTokenMiddle, sampleController.findAll);

export { sampleRoute }