import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketsApi from '../../services/ticketApi';

export default function useTicket() {
  const token = useToken();
  
  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getticket
  } = useAsync(() => ticketsApi.getTicket(token));

  return {
    ticket,
    ticketLoading,
    ticketError,
    getticket
  };
}
