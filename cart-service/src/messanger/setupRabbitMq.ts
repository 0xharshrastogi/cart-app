import amqplib from 'amqplib';

export class RabbitMqHandler {
  private readonly EXCHANGE_NAME = 'microservice_exchange';

  private readonly ROUTING_KEY = 'microservice_key';

  private readonly QUEUE_NAME = 'microservice_queue';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly event = new Map<string, ((payload: any) => void)[]>();

  constructor(private readonly url: string) {}

  private async setup() {
    const connection = await amqplib.connect(this.url);
    const channel = await connection.createChannel();
    await channel.assertExchange(this.EXCHANGE_NAME, 'direct', {
      durable: false,
    });
    const { queue } = await channel.assertQueue(this.QUEUE_NAME, {
      durable: false,
    });
    await channel.bindQueue(queue, this.EXCHANGE_NAME, this.ROUTING_KEY);
    return { channel, queue };
  }

  async publish<T>(type: string, payload: T) {
    const { channel } = await this.setup();

    channel.publish(
      this.EXCHANGE_NAME,
      this.ROUTING_KEY,
      Buffer.from(JSON.stringify({ type, payload }))
    );
  }

  async consume<T>(type: string, handler: (payload: T) => void) {
    const { channel, queue } = await this.setup();

    const events = this.event.get(type) ?? [];
    events.push(handler);
    this.event.set(type, events);

    channel.consume(queue, (message) => {
      if (!message) {
        return;
      }

      const { type, payload } = JSON.parse(message.content.toString()) as {
        type: string;
        payload: unknown;
      };
      const events = this.event.get(type);
      console.log(type, events);
      if (!events) {
        console.log('no event');
        channel.ack(message);
        return;
      }
      for (const handler of events) {
        handler(payload);
      }
      channel.ack(message);
    });
  }
}
