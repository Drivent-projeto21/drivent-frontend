/* eslint-disable indent */
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import getEnrollment from '../../hooks/api/useEnrollment';
import UserWithoutEnrollment from './UserWithoutEnrollment';
import useTicket from '../../hooks/api/useTicket';
import TickestType from './TicketsType';
import { useState } from 'react';
import TicketAndPayment from './TicketAndPayment';

export default function Payment() {
  const { enrollment } = getEnrollment();
  const { ticket, ticketLoading } = useTicket();
  const [ticketReserved, setTicketReserved] = useState(false);
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <MainScr>
        {enrollment ? 
        ticketReserved || (ticket && !ticketLoading) ? <TicketAndPayment /> : (
          <TickestType setTicketReserved={setTicketReserved}/>
        ) : (
          <NotEnrollScr>
            <UserWithoutEnrollment />
          </NotEnrollScr>
        )}
      </MainScr>
    </>
  );
}

const NotEnrollScr = styled.div`
  display: flex;
  margin: 200px 150px;
  padding: 0 120px;
  text-align: center;
`;

const MainScr = styled.div``;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
