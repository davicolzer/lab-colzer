import { Request, Response } from 'express';
import { DefaultError } from '../../shared/errors';
import { ICreateSample } from './types/dtos';
import { ISampleService } from './types/funtions';

export default function SampleController(
  sampleService: ISampleService,
) {
  async function createOne(request: Request, response: Response) {
    try {
      const data = request.body as ICreateSample;

      const createdUser = await sampleService.createOne(data);

      return response.status(201).json(createdUser);
    } catch (e) {
      const { code, ...error } = e as DefaultError;
      return response.status(code).json({ ...error });
    }
  }
  async function findOne(request: Request, response: Response) {
    try {
      const { sample } = request.params;

      const foundSample = await sampleService.findOne(sample);

      return response.status(200).json(foundSample);
    } catch (e) {
      const { code, ...error } = e as DefaultError;
      return response.status(code).json({ ...error });
    }
  }
  
  async function findAll(request: Request, response: Response) {
    try {
      const allSample = await sampleService.findAll();

      return response.status(200).json(allSample);
    } catch (e) {
      const { code, ...error } = e as DefaultError;
      return response.status(code).json({ ...error });
    }
  }
  return {
    createOne,
    findOne,
    findAll
  };
}
