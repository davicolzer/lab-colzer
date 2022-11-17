import * as bcrypt from 'bcrypt';
import { bcryptSalt } from '../../constants';
import { DefaultError } from '../../shared/errors';
import { IUser } from '../../shared/infra/models/user.model';
import { IRepository } from '../../shared/infra/repository/index.d';
import { CreateUserValidator, ICreateUser } from './types/dtos';
import { IUserService } from './types/funtions';

export function UserService(repository: IRepository<IUser>): IUserService {
  async function createOne(data: ICreateUser) {
    const parsed = await CreateUserValidator.safeParseAsync(data);
    if (!parsed.success) {
      throw new DefaultError({
        code: 400,
        message: 'Dados Incorretos',
        zodFields: parsed.error.issues,
      });
    }

    const foundUser = await repository.findOne({ email: data.email });
    if (foundUser) {
      throw new DefaultError({
        code: 400,
        message: 'Usuário já existe',
      });
    }

    const encryptPassword = await bcrypt.hash(data.password, bcryptSalt);

    const { password, ...createdUser } = await repository.createOne({
      ...data,
      password: encryptPassword,
    });

    return createdUser;
  }

  return {
    createOne,
  };
}
