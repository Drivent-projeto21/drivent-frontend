/* eslint-disable indent */
import styled from 'styled-components';

import { Typography } from '@material-ui/core';
import useTicketType from '../../hooks/api/useTickets';

function TicketBox() {
  const { ticketType } = useTicketType();

  return (
    <>
      {ticketType?.length > 0
        ? ticketType.map((t, i) => (
            <ChoiceBox>
              <TicketTitle key={i}>{t.name}</TicketTitle>
              <TicketPrice key={i}>R$ {t.price}</TicketPrice>
            </ChoiceBox>
          ))
        : 'Nada'}
      {/* <ChoiceBox>
        <TicketTitle variant="h5">{ticketType?.length > 0 ? ticketType.map((el) => el.name) : 'Nada'}</TicketTitle>
        <TicketPrice variant="h6">{ticketType?.length > 0 ? ticketType.map((el) => el.price) : 'Nada'}</TicketPrice>
      </ChoiceBox> */}
    </>
  );
}

export default function TickestType() {
  return (
    <>
      <StyledTypography variant="colorTextSecondary">Primeiro, escolha a modalidade do ingresso </StyledTypography>
      <BoxTicket>{<TicketBox />}</BoxTicket>
    </>
  );
}

const ChoiceBox = styled.div`
  width: 145px;
  height: 145px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #cecece;
  border-radius: 20px;
  margin: 20px 30px 0 0;
`;

const TicketPrice = styled(Typography)`
  color: #898989;
`;

const TicketTitle = styled(Typography)`
  color: #454545;
`;

const BoxTicket = styled.div`
  display: flex;
`;

const StyledTypography = styled(Typography)``;
