import { Plugin, YogaInitialContext } from 'graphql-yoga';
import { ExecutionArgs, ExecutionResult, Kind } from 'graphql';
import { PinoLogger } from 'nestjs-pino';

import { maskSensitive } from '../utils/mask.utils';

import { GraphQLContext } from '../types/graphql.types';

export type ExecutionType = {
  args: ExecutionArgs;
  context: YogaInitialContext;
};

export function graphqlLogger(logger: PinoLogger): Plugin {
  return {
    onExecute(obj: ExecutionType) {
      const args = obj.args;
      const context = obj.context as GraphQLContext;
      const reqId = context.req?.headers['x-request-id'] as string;

      const { document, operationName, variableValues = null } = args;
      const start = Date.now();

      // Find the main operation definition
      const operationDefinition = document.definitions.find(
        (def) => def.kind === Kind.OPERATION_DEFINITION,
      );

      // Extract the operation type if the definition is found
      const operationType =
        operationDefinition?.kind === Kind.OPERATION_DEFINITION
          ? operationDefinition.operation
          : 'unknown';

      let resolverName: string | undefined;
      // Check for a selection set and get the first field's name
      const selectionSet = operationDefinition?.selectionSet;
      if (selectionSet?.selections && selectionSet?.selections.length > 0) {
        const firstSelection = selectionSet.selections[0];
        if (firstSelection.kind === Kind.FIELD) {
          resolverName = firstSelection.name.value;
        }
      }

      const logJson = {
        msg: 'GraphQL subscription started',
        operationName,
        operationType,
        resolverName,
        variables: maskSensitive(variableValues),
        reqId,
      };

      return {
        onExecuteDone({ result }) {
          // Check if the result is an async iterator (for subscriptions)
          if (Symbol.asyncIterator in result) {
            // Log for a subscription (optional)
            logger.info(logJson);
            return; // Exit as we don't have a final result yet
          }

          // At this point, `result` is a standard ExecutionResult
          const duration = Date.now() - start;
          const errors =
            (result as ExecutionResult).errors?.map((e) => ({
              message: e.message,
              path: e.path,
            })) ?? [];

          logJson.msg = 'GraphQL operation executed';
          logJson['duration'] = duration;
          logJson['status'] = errors.length > 0 ? 'error' : 'success';
          logJson['errors'] = errors.length > 0 ? errors : undefined;

          logger.info(logJson);
        },
      };
    },
  };
}
