/* eslint-disable indent */
import api from './api';

export async function getAllActivities(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getVenues(token) {
    const response = await api.get('/activities/venues', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  }
