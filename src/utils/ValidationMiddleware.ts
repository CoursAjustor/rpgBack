import { sanitize } from 'class-sanitizer';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

export function dtoValidationMiddleware(
  type: any,
  skipMissingProperties = false,
): RequestHandler {
  return (req, res, next) => {
    const dtoObj = plainToClass(type, req.body);
    validate(dtoObj, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors = errors
            .map((error: ValidationError) =>
              (Object as any).values(error.constraints),
            )
            .join(', ');
          return res.status(400).json({
            status: 'error',
            message: dtoErrors,
          });
        } else {
          //sanitize the object and call the next middleware
          sanitize(dtoObj);
          req.body = dtoObj;
          next();
        }
      },
    );
  };
}
