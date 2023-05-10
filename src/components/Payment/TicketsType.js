/* eslint-disable indent */
import styled from 'styled-components';

import { Typography } from '@material-ui/core';
import useTickets from '../../hooks/api/useTickets';

export default function TickestType() {
  const { getTicketType } = useTickets();
  console.log(getTicketType);
  return (
    <>
      <StyledTypography variant="colorTextSecondary">Primeiro, escolha a modalidade do ingresso </StyledTypography>
      <BoxTicket>{getTicketType.price}</BoxTicket>
    </>
  );
}

const BoxTicket = styled.div``;

const StyledTypography = styled(Typography)``;
