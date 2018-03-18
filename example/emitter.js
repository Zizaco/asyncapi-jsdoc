var amqp = require('amqplib/callback_api');

/**
 * @asyncApi
 * servers:
 * - url: api.streetlights.smartylighting.com:{port}
 *   scheme: amqp
 *   description: Test broker
 *   variables:
 *     port:
 *       description: Secure connection (TLS) is available through port 8883.
 *       default: '1883'
 *       enum:
 *         - '1883'
 *         - '8883'
 * topics:
 *   event.{streetlightId}.lighting.measured:
 *     publish:
 *       $ref: '#/components/messages/lightMeasured'
 * components:
 *   messages:
 *     lightMeasured:
 *       summary: Inform about environmental lighting conditions for a particular streetlight.
 *       payload:
 *         type: object
 *         properties:
 *           lumens:
 *             type: integer
 *             minimum: 0
 *             description: Light intensity measured in lumens.
 *           sentAt:
 *             $ref: "#/components/schemas/sentAt"
 *   schemas:
 *     sentAt:
 *       type: string
 *       format: date-time
 *       description: Date and time when the message was sent.
 */
function lightingConditions (streetlightId) {
  amqp.connect('amqp://api.streetlights.smartylighting.com', function(err, conn) {
    conn.createChannel(function(err, ch) {
      const q = `event.${streetlightId}.lighting.measured`;
      const contents = {lumens: 900, sendAt: (new Date()).toString()}
      const buffer = Buffer.from(JSON.stringify(obj));

      ch.assertQueue(q, {durable: false});
      ch.sendToQueue(q, buffer);
    });
  });
}
