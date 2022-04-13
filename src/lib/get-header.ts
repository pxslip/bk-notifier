import { APIGatewayProxyEventHeaders } from 'aws-lambda';

/**
 * Abstract getting the headers as some servers lower case them and some don't
 * @param headers The headers of the request
 * @param key The header name, try both original and lowercase variant
 * @returns The header or an empty string on failure
 */
export default function (headers: APIGatewayProxyEventHeaders, key: string): string {
  return headers[key] || headers[key.toLowerCase()] || '';
}
