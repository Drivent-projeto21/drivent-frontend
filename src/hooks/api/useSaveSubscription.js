import useAsync from '../useAsync';
import useToken from '../useToken';

import * as subscriptionApi from '../../services/subscriptionApi';

export default function useSaveSubscription() {
  const token = useToken();

  const {
    loading: saveSubscriptionLoading,
    error: saveSubscriptionError,
    act: saveSubscription
  } = useAsync((data) => subscriptionApi.subscribe(data, token), false);

  return {
    saveSubscriptionLoading,
    saveSubscriptionError,
    saveSubscription
  };
}
