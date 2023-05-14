import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useUserBooking() {
  const token = useToken();
  
  const {
    data: userBooking,
    loading: userBookingLoading,
    error: userBookingError,
    act: getUserBooking
  } = useAsync(() => bookingApi.getUserBooking(token));

  return {
    userBooking,
    userBookingLoading,
    userBookingError,
    getUserBooking
  };
}
