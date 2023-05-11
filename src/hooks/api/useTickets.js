import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketsApi from '../../services/ticketTypeApi';

export default function useTicketType() {
  const token = useToken();

  const {
    data: ticketType,
    loading: ticketTypeLoading,
    error: ticketTypeError,
    act: getTicketType,
  } = useAsync(() => ticketsApi.getTicketType(token));

  return {
    ticketType,
    ticketTypeLoading,
    ticketTypeError,
    getTicketType,
  };
}
