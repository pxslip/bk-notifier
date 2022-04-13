import axios from 'axios';
import importJson from './import-json.js';
const env = await importJson('../.env.json');

export default async function () {
  const { data } = await axios.post('https://id.twitch.tv/oauth2/token', {
    client_id: env.Internal.client_id,
    client_secret: env.Internal.client_secret,
    grant_type: 'client_credentials',
  });
  return data;
}
