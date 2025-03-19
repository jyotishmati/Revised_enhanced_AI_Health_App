import amqplib from 'amqplib';

let channel: amqplib.Channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue('notifications', { durable: true });
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('RabbitMQ Connection Error:', error);
  }
};

const getChannel = () => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  return channel;
};

export { connectRabbitMQ, getChannel };
