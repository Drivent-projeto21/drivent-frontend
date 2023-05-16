/* eslint-disable indent */
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import getEnrollment from '../../hooks/api/useEnrollment';
import TickestType from './TicketsType';
import { useContext, useState } from 'react';
import TicketAndPayment from './TicketAndPayment';
import TicketInfoContext from '../../contexts/TicketInfoContext';
import Generic from '../Activities/Generic';

export default function Payment() {
  const { enrollment } = getEnrollment();
  const [ticketReserved, setTicketReserved] = useState(false);
  const { ticketInfo } = useContext(TicketInfoContext);
  
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <MainScr>
        {enrollment ? 
        ticketReserved || (ticketInfo) ? <TicketAndPayment ticket={ticketInfo} /> : (
          <TickestType setTicketReserved={setTicketReserved}/>
        ) : (
          <Generic>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Generic>
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
