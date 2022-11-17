import { ICreateUser, IUserResponse } from './dtos';

export type IUserService = {
  createOne(data: ICreateUser): Promise<IUserResponse>;
};
