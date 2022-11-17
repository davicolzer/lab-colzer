import { ISample, Sample } from '../shared/infra/models/sample.model';
import { IUser, User } from '../shared/infra/models/user.model';
import { Repository } from '../shared/infra/repository';
import AuthController from './auth/authController';
import AuthService from './auth/authService';
import SampleController from './sample/sampleController';
import { SampleService } from './sample/sampleService';
import UserController from './user/userController';
import { UserService } from './user/userService';

// Repositories
const userRepository = Repository<IUser>(User);
const sampleRepository = Repository<ISample>(Sample);

// User
const userService = UserService(userRepository);
export const userController = UserController(userService);

// Auth
const authService = AuthService(userRepository);
export const authController = AuthController(authService);

// Sample
const sampleService = SampleService(sampleRepository);
export const sampleController = SampleController(sampleService);