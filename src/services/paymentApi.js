/* eslint-disable indent */
import api from './api';

export async function processPayment(body, token) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getPayment(token, ticketId) {
    /* eslint-disable no-console */
    const response = await api.get(`/payments?ticketId=${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  }
