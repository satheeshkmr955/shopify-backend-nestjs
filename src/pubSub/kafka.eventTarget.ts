import type { Producer, Consumer } from 'kafkajs';
import type {
  TypedEventTarget,
  TypedEvent,
} from '@graphql-yoga/typed-event-target';

export type CreateKafkaEventTargetArgs = {
  producer: Producer;
  consumer: Consumer;
  serializer?: {
    stringify: (message: unknown) => string;
    parse: (message: string) => unknown;
  };
};

export function createKafkaEventTarget<TEvent extends TypedEvent>(
  args: CreateKafkaEventTargetArgs,
): TypedEventTarget<TEvent> {
  const {
    producer,
    consumer,
    serializer = { stringify: JSON.stringify, parse: JSON.parse },
  } = args;

  const listeners = new Map<string, Set<(event: TEvent) => void>>();
  let consumerIsRunning = false;

  async function ensureConsumerIsRunning() {
    if (consumerIsRunning) {
      return;
    }
    consumerIsRunning = true;

    // Start the consumer's message consumption loop
    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const payloadStr = message.value?.toString();
        if (!payloadStr) return;

        try {
          const detail = (await serializer.parse(
            payloadStr,
          )) as TEvent['detail'];
          const event = { type: topic as TEvent['type'], detail } as TEvent;

          const topicListeners = listeners.get(topic);
          if (topicListeners) {
            for (const listener of topicListeners) {
              listener(event);
            }
          }
        } catch (error) {
          console.error(`Error parsing message from topic ${topic}:`, error);
        }
      },
    });
  }

  return {
    addEventListener(type, callback) {
      if (callback === null) return;

      if (!listeners.has(type)) {
        listeners.set(type, new Set());
        // Subscribe to the Kafka topic
        consumer
          .subscribe({ topic: type, fromBeginning: false })
          .catch((err) =>
            console.error(`Failed to subscribe to topic ${type}:`, err),
          );
      }

      const listenerFn: (event: TEvent) => void =
        typeof callback === 'function'
          ? (callback as (event: TEvent) => void)
          : (callback.handleEvent.bind(callback) as (event: TEvent) => void);

      listeners.get(type)!.add(listenerFn);

      // Ensure the consumer is running after the first subscription
      ensureConsumerIsRunning().catch(console.error);
    },

    dispatchEvent(event) {
      // Fire-and-forget publish to Kafka
      producer
        .send({
          topic: event.type,
          messages: [{ value: serializer.stringify(event.detail) }],
        })
        .catch(console.error);
      return true;
    },

    removeEventListener(type, callback) {
      if (callback === null) return;

      const set = listeners.get(type);
      if (!set) return;

      const listenerFn: (event: TEvent) => void =
        typeof callback === 'function'
          ? (callback as (event: TEvent) => void)
          : (callback.handleEvent.bind(callback) as (event: TEvent) => void);

      set.delete(listenerFn);
    },
  } as TypedEventTarget<TEvent>;
}
