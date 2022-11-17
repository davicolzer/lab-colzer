import { Request, Response } from 'express';
import { DefaultError } from '../../shared/errors';
import { ICreateUser } from './types/dtos';
import { IUserService } from './types/funtions';

export default function UserController(
  userService: IUserService,
) {
  async function createOne(request: Request, response: Response) {
    try {
      const data = request.body as ICreateUser;

      const createdUser = await userService.createOne(data);

      return response.status(201).json(createdUser);
    } catch (e) {
      const { code, ...error } = e as DefaultError;
      return response.status(code).json(e);
    }
  }

  return {
    createOne,
  };
}
