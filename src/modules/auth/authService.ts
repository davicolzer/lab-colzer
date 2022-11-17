import { DefaultError } from '../../shared/errors';
import { ILogin, loginValidator } from './types/dtos';
import { IAuthService } from './types/functions';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../../constants';
import { IRepository } from '../../shared/infra/repository/index.d';
import { IUser } from '../../shared/infra/models/user.model';

export default function AuthService(
  repository: IRepository<IUser>
): IAuthService {
  async function login(data: ILogin) {
    const parsed = await loginValidator.safeParseAsync(data);
    if (!parsed.success) {
      throw new DefaultError({
        code: 400,
        message: 'Usuário ou senha incorretos',
        zodFields: parsed.error.issues,
      });
    }

    const foundUser = await repository.findOne({ email: data.email });

    if (!foundUser) {
      throw new DefaultError({
        code: 404,
        message: `Usuário ou senha incorretos`,
      });
    }

    const checkedPassword = await bcrypt.compare(
      data.password,
      foundUser.password
    );

    if (!checkedPassword) {
      throw new DefaultError({
        code: 404,
        message: `Usuário ou senha incorretos`,
      });
    }

    const { password, ...user } = foundUser;

    const token = jwt.sign(user, jwtSecret, {
      expiresIn: 60 * 60 * 24, // 1 day
    });

    return { token, user };
  }

  return {
    login,
  };
}
