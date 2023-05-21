import api from './api';

export async function subscribe(body, token) {
  const response = await api.post('/subscriptions', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
