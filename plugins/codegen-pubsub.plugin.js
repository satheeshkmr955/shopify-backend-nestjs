/**
 * A GraphQL Codegen plugin that generates a PubSubEventMap from type Subscription.
 */
module.exports = {
  plugin: (schema) => {
    const subscriptionType = schema.getType('Subscription');
    if (!subscriptionType) {
      return `export interface PubSubEventMap {
  [key: string]: any;
}
`;
    }

    const fields = subscriptionType.getFields();
    const entries = Object.entries(fields)
      .map(([fieldName, field]) => {
        const typeName = field.type.toString().replace(/[\[\]!]/g, '');
        return `  ${fieldName}: [{ ${fieldName}: ResolversTypes['${typeName}'] }];`;
      })
      .join('\n');

    return `import { ResolversTypes } from './graphql';

export interface PubSubEventMap {
${entries}
  ${`[key: string]: any;`}
}
`;
  },
};
