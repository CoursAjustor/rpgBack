import { Router } from 'express';
import { Credential } from '../services/credentials.service';
import { CustomRouter } from '../utils/CustomRouter';
import { dtoValidationMiddleware } from '../utils/ValidationMiddleware';
import { UserController } from './user.controller';
import { CreateUserDto } from './user.dto';

// /users
class UsersRoutes extends CustomRouter {
  public routes(): Router {
    this.router.get('/', UserController.index);

    this.router.post(
      '/',
      dtoValidationMiddleware(CreateUserDto),
      UserController.create,
    );

    this.router.use(Credential.checkUserCredentials);
    this.router.get('/:username', UserController.getByUsername);
    this.router.delete('/:username', UserController.deleteUser);

    return this.router;
  }
}

export const usersRoutes = new UsersRoutes();
