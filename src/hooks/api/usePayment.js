import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePayment() {
  const token = useToken();
  
  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
    act: getPayment
  } = useAsync((ticketId) => paymentApi.getPayment(token, ticketId));

  return {
    payment,
    paymentLoading,
    paymentError,
    getPayment
  };
}
