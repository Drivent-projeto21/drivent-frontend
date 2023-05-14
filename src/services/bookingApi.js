import api from './api';

export async function getBookings(hotelId, token) {
  const response = await api.get(`/hotels/bookings/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

