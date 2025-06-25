import { ID_TOKEN } from './token.ts';

export async function getAllEntities(entity: string, context = '', parameters: Record<string, string> = {}) {
  const queryParams = new URLSearchParams(parameters).toString();
  let url = `https://id.uat2.eu.nextreason.com/config/v1/${entity}`
  if (context) {
    url += `/${context}`;
  }
  if (queryParams) {
    url += `?${queryParams}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-login-type': 'internal',
      'x-id-token': ID_TOKEN,
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

export async function getEntity(entity: string, entityId: string, context = '', parameters: Record<string, string> = {}) {
  const queryParams = new URLSearchParams(parameters).toString();
  let url = `https://id.uat2.eu.nextreason.com/config/v1/${entity}/${entityId}`
  if (context) {
    url += `/${context}`;
  }
  if (queryParams) {
    url += `?${queryParams}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-login-type': 'internal',
      'x-id-token': ID_TOKEN,
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}
