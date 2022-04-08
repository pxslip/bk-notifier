import axios from 'axios';
import env from '../.env.json';

const [, , url] = process.argv;

axios.post(
  url,
  {
    type: 'stream.online',
    version: 1,
  },
  {
    headers: {
      Authorization: `Bearer ${env.client_secret}`,
      'Client-Id': env.client_id,
      'Content-Type': 'application/json',
    },
  },
);
