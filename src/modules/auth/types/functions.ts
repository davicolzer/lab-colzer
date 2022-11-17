import { IUser } from '../../../shared/infra/models/user.model';
import { ILogin } from './dtos';

export type ILoggedUser = Pick<IUser, 'email' | 'name'>
export type ILoggedIn = { token: string; user: ILoggedUser };

export interface IAuthService {
  login(data: ILogin): Promise<ILoggedIn>;
}
