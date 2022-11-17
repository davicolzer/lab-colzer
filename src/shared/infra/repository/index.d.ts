import { Model, LeanDocument, Document, FilterQuery } from 'mongoose';
import { IUserResponse } from '../../../modules/user/types/dtos';

export type IRepository<IData> = {
  createOne(data: IData): Promise<{ _id: string } & IData>;
  findOne(data: FilterQuery<IData>): Promise<{ _id: string } & IData>;
  findAll(): Promise<({ _id: string } & IData)[]>;
};
