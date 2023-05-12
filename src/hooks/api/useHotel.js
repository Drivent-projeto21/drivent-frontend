import useAsync from '../useAsync';
import * as hotelApi from '../../services/hotelApi';
import useToken from '../useToken';

export default function useHotel() {
  const token = useToken();

  const {
    data: hotels,
    loading: loadingHotels,
    error: hotelsError,
    act: getHotels
  } = useAsync(() => hotelApi.getHotels(token));

  return {
    hotels,
    loadingHotels,
    hotelsError,
    getHotels
  };
}
