import axios from 'axios';
import importJson from './import-json.js';
import getToken from './get-token.js';
const { Parameters } = await importJson('../.env.json');
const { access_token } = await getToken();

const [, , event, conditionText, callback] = process.argv;

if (Parameters.TWITCH_HMAC_SECRET) {
  try {
    const condition = JSON.parse(conditionText);
    const resp = await axios.post(
      'https://api.twitch.tv/helix/eventsub/subscriptions',
      {
        type: event,
        version: 1,
        condition,
        transport: {
          method: 'webhook',
          callback: callback,
          secret: Parameters.TWITCH_HMAC_SECRET,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Client-Id': Parameters.TWITCH_CLIENT_ID,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(resp.data);
  } catch (exc) {
    console.error(exc);
  }
} else {
  throw new Error('HMAC secret not set, please update .env.json with that information');
}
