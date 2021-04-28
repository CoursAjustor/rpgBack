import { Router } from 'express';
import { CustomRouter } from '../utils/CustomRouter';
import { dtoValidationMiddleware } from '../utils/ValidationMiddleware';
import { CreateItemDto } from './dto/item.dto';
import { ItemController } from './item.controller';

class ItemRoutes extends CustomRouter {
  public routes(): Router {
    this.router.get('/', ItemController.index);

    this.router.post(
      '/',
      dtoValidationMiddleware(CreateItemDto),
      ItemController.create,
    );

    this.router.delete('/:id', ItemController.delete);

    return this.router;
  }
}

export const itemsRoutes = new ItemRoutes();
