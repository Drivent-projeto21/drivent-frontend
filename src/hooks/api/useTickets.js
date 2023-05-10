import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketTypeApi from '../../services/ticketTypeApi';

export default function useTicketType() {
  const token = useToken();

  const { data: isRemote, price, act: getTicketType } = useAsync(() => ticketTypeApi.getTicketType(token));

  return {
    isRemote,
    price,
    getTicketType,
  };
}
