import axios from 'axios';
import importJson from './import-json.js';
const env = await importJson('../.env.json');

export default async function () {
  const { data } = await axios.post('https://id.twitch.tv/oauth2/token', {
    client_id: env.Parameters.TWITCH_CLIENT_ID,
    client_secret: env.Parameters.TWITCH_CLIENT_SECRET,
    grant_type: 'client_credentials',
  });
  return data;
}
