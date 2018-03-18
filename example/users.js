var amqp = require('amqplib/callback_api');

/**
 * @asyncApi
 * servers:
 * - url: api.company.com:{port}/{app-id}
 *   description: Allows you to connect using the MQTT protocol.
 *   scheme: mqtt
 *   variables:
 *     app-id:
 *       default: demo
 *       description: You can find your `app-id` in our control panel, under the auth tab.
 *     port:
 *       enum:
 *         - '5676'
 *         - '5677'
 *       default: '5676'
 * - url: api.company.com:{port}/{app-id}
 *   description: Allows you to connect using the AMQP protocol.
 *   scheme: amqp
 *   variables:
 *     app-id:
 *       default: demo
 *       description: You can find your `app-id` in our control panel, under the auth tab.
 *     port:
 *       enum:
 *         - '5676'
 *         - '5677'
 *       default: '5676'
 *
 * topics:
 *   users.event.user.update:
 *     subscribe:
 *       $ref: "#/components/messages/userSignedUp"
 *
 * components:
 *   messages:
 *     userSignUp:
 *       deprecated: false
 *       summary: Action to sign a user up.
 *       description: |
 *         Multiline description of what this action does. **It allows Markdown.**
 *       tags:
 *         - name: user
 *         - name: signup
 *       headers:
 *         type: object
 *         properties:
 *           qos:
 *             $ref: "#/components/schemas/MQTTQoSHeader"
 *           retainFlag:
 *             $ref: "#/components/schemas/MQTTRetainHeader"
 *       payload:
 *         type: object
 *         properties:
 *           user:
 *             $ref: "#/components/schemas/userCreate"
 *           signup:
 *             $ref: "#/components/schemas/signup"
 *     userSignedUp:
 *       payload:
 *         type: object
 *         properties:
 *           test:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 key1:
 *                   type: string
 *                 key2:
 *                   type: integer
 *           user:
 *             $ref: "#/components/schemas/user"
 *           signup:
 *             $ref: "#/components/schemas/signup"
 *   schemas:
 *     id:
 *       title: id
 *       description: Resource identifier
 *       type: string
 *     username:
 *       title: username
 *       description: User handle
 *       type: string
 *     datetime:
 *       title: datetime
 *       description: Date and Time of the message
 *       type: string
 *       format: date-time
 *     MQTTQoSHeader:
 *       title: qos
 *       description: Quality of Service
 *       type: integer
 *       format: int32
 *       default: 1
 *       enum:
 *         - 0
 *         - 2
 *     MQTTRetainHeader:
 *       title: retainFlag
 *       description: |
 *         This flag determines if the message will be saved by the broker for the specified
 *         topic as last known good value. New clients that subscribe to that topic will receive
 *         the last retained message on that topic instantly after subscribing. More on retained messages
 *         and best practices in one of the next posts.
 *       type: boolean
 *       default: false
 *     user:
 *       type: object
 *       required:
 *         - id
 *         - username
 *       properties:
 *         id:
 *           description: User Id
 *           $ref: "#/components/schemas/id"
 *         full_name:
 *           description: User full name
 *           type: string
 *         username:
 *           $ref: "#/components/schemas/username"
 *     userCreate:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         full_name:
 *           description: User full name
 *           type: string
 *         username:
 *           $ref: "#/components/schemas/username"
 *
 *     signup:
 *       type: object
 *       required:
 *         - method
 *         - datetime
 *       properties:
 *         method:
 *           description: Signup method
 *           type: string
 *           enum:
 *             - email
 *             - facebook
 *             - twitter
 *             - github
 *             - google
 *         datetime:
 *           $ref: "#/components/schemas/datetime"
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
