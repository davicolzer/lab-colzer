import { NextFunction, Request, Response } from 'express';
import { DefaultError } from '../../shared/errors';

import { IUser } from '../../shared/infra/models/user.model';

export type ICheckTokenMiddle = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<void | Response>;

export type ILoggedUser = Pick<IUser, 'email' | 'name'>
  