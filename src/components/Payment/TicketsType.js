import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import useTicketType from '../../hooks/api/useTickets';

export default function TicketsType() {
  const { ticketType } = useTicketType();
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [includeHotel, setIncludeHotel] = useState(false);
  const [total, setTotal] = useState(0);

  function handleTicketSelect(ticketId) {
    setSelectedTicketId(ticketId);
  }

  function handleProceed() {
    const selectedTicket = ticketType.find((ticket) => ticket.id === selectedTicketId);
    const ticketPrice = selectedTicket ? selectedTicket.price : 0;
    const hotelPrice = includeHotel ? 100 : 0;
    const totalPrice = ticketPrice + hotelPrice;
    setTotal(totalPrice);
  }

  return (
    <>
      <StyledTypography variant="colorTextSecondary">Primeiro, escolha a modalidade do ingresso</StyledTypography>
      <BoxTicket>
        {ticketType?.length > 0 ? (
          <>
            {ticketType
              .filter((ticket) => ticket.includesHotel === false)
              .map((ticket) => (
                <TicketBox key={ticket.id} ticket={ticket} onSelect={handleTicketSelect} />
              ))}
          </>
        ) : (
          <span>Nada</span>
        )}
      </BoxTicket>
      {selectedTicketId && (
        <>
          <StyledTypography variant="colorTextSecondary">
            Ótimo! Agora escolha a modalidade de hospedagem
          </StyledTypography>
          <BoxTicket>
            {ticketType
              .filter((ticket) => ticket.includesHotel === true)
              .map((ticket) => (
                <TicketBox
                  key={ticket.id}
                  ticket={{ ...ticket, name: 'Com Hotel', price: '350' }}
                  onSelect={handleTicketSelect}
                />
              ))}
            {ticketType?.length > 0 ? (
              <>
                {ticketType
                  .filter((ticket) => ticket.isRemote === false && ticket.includesHotel === false)
                  .map((ticket) => (
                    <TicketBox
                      key={ticket.id}
                      ticket={{ ...ticket, name: 'Sem Hotel', price: '0' }}
                      onSelect={handleTicketSelect}
                    />
                  ))}
              </>
            ) : (
              <span>Nada</span>
            )}
          </BoxTicket>
          <TotalSection>
            <StyledTypography variant="colorTextSecondary">
              Fechado! O total ficou em R$ {total}. Agora é só confirmar:
            </StyledTypography>
            <ButtonSection>
              <Link to="">
                <ConfirmButton variant="contained" color="primary" onClick={handleProceed}>
                  RESERVAR INGRESSO
                </ConfirmButton>
              </Link>
            </ButtonSection>
          </TotalSection>
        </>
      )}
    </>
  );
}

function TicketBox({ ticket, onSelect }) {
  const [selected, setSelected] = useState(false);

  function select() {
    setSelected(true);
    onSelect(ticket.id);
  }

  return (
    <ChoiceBox className={selected ? 'selected' : ''} onClick={select}>
      <TicketTitle>{ticket.name}</TicketTitle>
      <TicketPrice>R$ {ticket.price}</TicketPrice>
    </ChoiceBox>
  );
}

const ConfirmButton = styled.button`
  width: 172px;
  height: 37px;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const ButtonSection = styled.div`
  margin-top: 20px;
`;

const TotalSection = styled.div``;

const ChoiceBox = styled.div`
  cursor: pointer;
  width: 145px;
  height: 145px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #cecece;
  border-radius: 20px;
  margin: 20px 30px 40px 0;

  &.selected {
    background-color: #ffeed2;
    border: none;
  }
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
