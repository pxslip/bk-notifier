import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { VerificationRequestBody } from '../../types/twitch';
import { verifyMessage } from '../lib/twitch-hmac-verification';
import axios from 'axios';

const TWITCH_MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase();

// Notification message types
const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
const MESSAGE_TYPE_NOTIFICATION = 'notification';
const MESSAGE_TYPE_REVOCATION = 'revocation';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
export default async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  let response: APIGatewayProxyResult = {
    statusCode: 404,
    body: 'Resource Not Found',
  };
  const type = event.headers[TWITCH_MESSAGE_TYPE];
  try {
    if (verifyMessage(event)) {
      const body: VerificationRequestBody = JSON.parse(event.body || '{}');
      if (type === MESSAGE_TYPE_VERIFICATION) {
        response = {
          statusCode: 200,
          body: body.challenge,
        };
      } else if (type === MESSAGE_TYPE_NOTIFICATION) {
        // respond as empty so twitch doesn't get twitchy
        response = {
          statusCode: 204,
          body: '',
        };
        // trigger the discord webhook
        const webhookUrl = process.env.DISCORD_GO_LIVE_WEBHOOK;
        if (webhookUrl) {
          axios.post(webhookUrl, {
            content: process.env.GO_LIVE_MESSAGE,
          });
        }
      } else if (type === MESSAGE_TYPE_REVOCATION) {
        console.log('Authorization revoked!');
      }
    }
  } catch (err) {
    console.log(err);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  }

  return response;
}
