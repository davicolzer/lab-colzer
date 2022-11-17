import { z } from 'zod';
import { IUser } from '../../../shared/infra/models/user.model';

const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;


export const CreateUserValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().regex(passwordRegex),
});

export type ICreateUser = z.infer<typeof CreateUserValidator>;

export type IUserResponse = { _id: string } & Omit<IUser, 'password'>;
