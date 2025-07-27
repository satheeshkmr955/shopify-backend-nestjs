import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: ZodSchema<T>) {}

  transform(value: unknown): T {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const flattened = result.error.flatten();

      throw new BadRequestException({
        message: 'Zod validation failed',
        errors: {
          fieldErrors: flattened.fieldErrors,
          formErrors: flattened.formErrors,
        },
      });
    }

    return result.data;
  }
}
