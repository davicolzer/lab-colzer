import { ICreateSample, ISampleResponse } from './dtos';

export type ISampleService = {
  createOne(data: ICreateSample): Promise<ISampleResponse>;
  findOne(
    sample: string
  ): Promise<{ codigo_amostra: string; resultado: string }>;
  findAll():Promise<ISampleResponse[]>
};
