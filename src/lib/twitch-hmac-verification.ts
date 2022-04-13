import { APIGatewayProxyEvent } from 'aws-lambda';
import { createHmac, timingSafeEqual } from 'crypto';
import getHeader from './get-header';

//TODO: stick this in an env variable
const HMAC_SECRET = 'zZ3Ptyy5UAMYw7tinizS';

const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id';
const TWITCH_MESSAGE_TIMESTAMP = 'Twitch-Eventsub-Message-Timestamp';
const TWITCH_MESSAGE_SIGNATURE = 'Twitch-Eventsub-Message-Signature';

// Build the message used to get the HMAC.
function getHmacMessage(request: APIGatewayProxyEvent): string {
  const msgId = getHeader(request.headers, TWITCH_MESSAGE_ID);
  const msgTimestamp = getHeader(request.headers, TWITCH_MESSAGE_TIMESTAMP);
  if (msgId && msgTimestamp) {
    return msgId + msgTimestamp + request.body;
  }
  return '';
}

// Get the HMAC.
function getHmac(secret: string, message: string) {
  const hmac = createHmac('sha256', secret).update(message).digest('hex');
  return `sha256=${hmac}`;
}

// Verify whether our hash matches the hash that Twitch passed in the header.
export function verifyMessage(request: APIGatewayProxyEvent): boolean | string {
  const hmac = getHmac(HMAC_SECRET, getHmacMessage(request));
  const signature = getHeader(request.headers, TWITCH_MESSAGE_SIGNATURE);
  if (signature) {
    return timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
  }
  return hmac;
}
