const amqp = require('amqplib/callback_api');

function connectRabbitMQ() {
  amqp.connect(process.env.RABBITMQ_URL, function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      const queue = 'task_queue';

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.consume(queue, function(msg) {
        console.log("Received:", msg.content.toString());
      }, {
        noAck: true,
      });
    });
  });
}

module.exports = connectRabbitMQ;
