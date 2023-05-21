import useAsync from '../useAsync';
import * as activityApi from '../../services/activityApi';
import useToken from '../useToken';

export default function useActivities() {
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivities,
  } = useAsync(() => activityApi.getAllActivities(token));

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivities,
  };
}
