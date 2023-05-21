import useAsync from '../useAsync';
import * as activityApi from '../../services/activityApi';
import useToken from '../useToken';

export default function useVenue() {
  const token = useToken();

  const {
    data: venues,
    loading: venuesLoading,
    error: venuesError,
    act: getVenues,
  } = useAsync(() => activityApi.getVenues(token));

  return {
    venues,
    venuesLoading,
    venuesError,
    getVenues,
  };
}
