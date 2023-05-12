/* eslint-disable indent */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import useTicketType from '../../hooks/api/useTicketTypes';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useSaveTicket from '../../hooks/api/useSaveTicket';

export default function TicketsType( { setTicketReserved } ) {
  const { ticketType } = useTicketType();
  const [chosenTicket, setChosenTicket] = useState(null);
  const [choseAccomodation, setChoseAcommodation] = useState(false);
  const [choseOnline, setChoseOnline] = useState(false);
  const { saveTicket, saveTicketLoading } = useSaveTicket();

  async function handleProceed() {
    try {
      await saveTicket({ ticketTypeId: chosenTicket.id });
      setTicketReserved(true);
      toast('Ingresso reservado com sucesso!');
    } catch (error) {
      toast('Não foi possível reservar seu ingresso!');
    }
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
                <ModalityBox key={ticket.id} ticket={ticket} setChosenTicket={setChosenTicket}
                chosenTicket={chosenTicket} setChoseOnline={setChoseOnline}/>
              ))}
          </>
        ) : (
          ''
        )}
      </BoxTicket>

      { chosenTicket && !chosenTicket.isRemote ? 
        <>
          <StyledTypography variant="colorTextSecondary">
            Ótimo! Agora escolha a modalidade de hospedagem
          </StyledTypography>
          <BoxTicket>
            {ticketType?.length > 0 &&
              ticketType.filter((ticket) => ticket.isRemote === false)
              .map((ticket) => (
                <AccomodationBox
                  key={ticket.id}
                  ticket={ticket}
                  setChosenTicket={setChosenTicket}
                  chosenTicket={chosenTicket}
                  setChoseAcommodation={setChoseAcommodation}
                  choseAccomodation={choseAccomodation}
                />
              ))}
          </BoxTicket>
        </>
        : ''}
        {chosenTicket && (choseAccomodation || choseOnline) ? 
          <TotalSection>
          <StyledTypography variant="colorTextSecondary">
            Fechado! O total ficou em R$ {chosenTicket.price}. Agora é só confirmar:
          </StyledTypography>
          <ButtonSection>
            <Link to="">
              <ConfirmButton disabled={saveTicketLoading} variant="contained" color="primary" onClick={handleProceed}>
                RESERVAR INGRESSO
              </ConfirmButton>
            </Link>
          </ButtonSection>
        </TotalSection>
        : ''}

    </>
  );
}

function ModalityBox({ ticket, setChosenTicket, chosenTicket, setChoseOnline }) {
  const [selected, setSelected] = useState(false);

  function select() {
    if (selected) {
      setSelected(false);
      setChosenTicket(null);
      if (ticket.isRemote) setChoseOnline(false);
      return;
    };
    if (!chosenTicket) {
      setSelected(true);
      setChosenTicket(ticket);
      if (ticket.isRemote) setChoseOnline(true);
    }
  }

  return (
    <ChoiceBox selected={selected} onClick={select}>
      <TicketTitle>{ticket.name}</TicketTitle>
      <TicketPrice>R$ ${ticket.price}</TicketPrice>
    </ChoiceBox>
  );
}

function AccomodationBox({ ticket, setChosenTicket, choseAccomodation, setChoseAcommodation }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => { setChoseAcommodation(false); setSelected(false); }, []);

  function select() {
    if (selected) {
      setSelected(false);
      setChoseAcommodation(false);
      return;
    };
    if (!choseAccomodation) {
      setSelected(true);
      setChosenTicket(ticket);
      setChoseAcommodation(true);
    }
  }

  return (
    <ChoiceBox selected={selected} onClick={select}>
      <TicketTitle>{ticket.includesHotel ? 'Com Hotel' : 'Sem Hotel'}</TicketTitle>
      <TicketPrice>{ticket.includesHotel ? '+ R$ 350' : '+ R$ 0'}</TicketPrice>
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
  border-radius: 20px;
  margin: 20px 30px 40px 0;
  background-color: ${props => props.selected ? '#ffeed2' : '#ffffff'};
  border: ${props => props.selected ? 'none' : '1px solid #cecece'};
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
