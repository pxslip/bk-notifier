import axios from 'axios';
import importJson from './import-json.js';
import getToken from './get-token.js';
const env = await importJson('../.env.json');
const { access_token } = await getToken();

const [, , url] = process.argv;

try {
  const resp = await axios.post(
    url,
    {
      type: 'stream.online',
      version: 1,
      condition: {
        broadcaster_user_id: '116790955',
      },
      transport: {
        method: 'webhook',
        callback: 'https://qgezd96ni1.execute-api.us-east-1.amazonaws.com/Prod/go-live',
        secret: env.Internal.twitch_eventsub_secret,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Client-Id': env.Internal.client_id,
        'Content-Type': 'application/json',
      },
    },
  );

  console.log(resp.data);
} catch (exc) {
  console.error(exc);
}
