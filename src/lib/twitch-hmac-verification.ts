import { APIGatewayProxyEvent } from 'aws-lambda';
import { createHmac, timingSafeEqual } from 'crypto';

//TODO: stick this in an env variable
const HMAC_SECRET = 'zZ3Ptyy&~5UAMY%w7`tiniz~S';

const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP = 'Twitch-Eventsub-Message-Timestamp'.toLowerCase();
const TWITCH_MESSAGE_SIGNATURE = 'Twitch-Eventsub-Message-Signature'.toLowerCase();

// Build the message used to get the HMAC.
function getHmacMessage(request: APIGatewayProxyEvent): string {
  if (request.headers[TWITCH_MESSAGE_ID] && request.headers[TWITCH_MESSAGE_TIMESTAMP]) {
    return (
      (request.headers[TWITCH_MESSAGE_ID] || '') + (request.headers[TWITCH_MESSAGE_TIMESTAMP] || '') + request.body
    );
  }
  return '';
}

// Get the HMAC.
function getHmac(secret: string, message: string) {
  return createHmac('sha256', secret).update(message).digest('hex');
}

// Verify whether our hash matches the hash that Twitch passed in the header.
export function verifyMessage(request: APIGatewayProxyEvent): boolean {
  const hmac = getHmac(HMAC_SECRET, getHmacMessage(request));
  const signature = request.headers[TWITCH_MESSAGE_SIGNATURE] || '';
  if (signature) {
    return timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
  }
  return false;
}
