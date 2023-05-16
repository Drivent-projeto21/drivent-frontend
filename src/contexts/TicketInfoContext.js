/* eslint-disable indent */
import { createContext, useEffect, useState } from 'react';
import useTicket from '../hooks/api/useTicket';

const TicketInfoContext = createContext();
export default TicketInfoContext;

export function TicketInfoProvider({ children }) {
  const { ticket, getticket }  = useTicket();
  const [ticketInfo, setTicketInfo] = useState(null);

  useEffect(() => {
    if (ticket) return setTicketInfo(ticket);
  }, [ticket]);

  const refreshTicket =  async() => {
    const updatedTicket = await getticket(); // Faz uma nova chamada para a API e retorna os dados atualizados do ticket
    setTicketInfo(updatedTicket);
  };
  
  return (
    <TicketInfoContext.Provider value={{ ticketInfo, setTicketInfo, refreshTicket }}>
      { children }
    </TicketInfoContext.Provider>
  );
}
