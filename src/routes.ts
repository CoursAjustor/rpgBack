import { Router } from 'express';
import { IndexController } from './index/index.controller';
import { loginRoutes } from './login/login.routes';
import { usersRoutes } from './users/users.routes';
import { CustomRouter } from './utils/CustomRouter';

export class Routes extends CustomRouter {
  public routes(): Router {
    this.router.get('/', IndexController.index);

    this.router.use('/login', loginRoutes.routes());
    this.router.use('/users', usersRoutes.routes());

    return this.router;
  }
}
