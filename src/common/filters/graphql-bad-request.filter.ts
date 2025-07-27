import { Catch, BadRequestException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

interface FlattenedZodErrors {
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
}

interface BadRequestResponse {
  message: string;
  errors?: FlattenedZodErrors;
  [key: string]: any;
}

@Catch(BadRequestException)
export class GraphQLBadRequestFilter
  implements GqlExceptionFilter<BadRequestException>
{
  catch(exception: BadRequestException): GraphQLError | GraphQLFormattedError {
    const response = exception.getResponse();

    const errorObj: BadRequestResponse =
      typeof response === 'string'
        ? { message: response }
        : (response as BadRequestResponse);

    const fieldErrors = errorObj.errors?.fieldErrors ?? {};
    const formErrors = errorObj.errors?.formErrors ?? [];

    const extensions = {
      code: 'BAD_USER_INPUT',
      fieldErrors,
      formErrors,
    };

    return new GraphQLError(errorObj.message || 'Zod validation failed', {
      extensions,
    });
  }
}
