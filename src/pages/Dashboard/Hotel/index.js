/* eslint-disable indent */
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import SelectHotel from '../../../components/Hotel/SelectHotel';
import Room from '../../../components/Room/Room';
import getHotels from '../../../hooks/api/useHotel';
import getTicket from '../../../hooks/api/useTicket';
import { useState } from 'react';

export default function Hotel() {
  const { ticket } = getTicket();
  const { hotels, loadingHotels } = getHotels();
  const [selectedHotel, setSelectedHotel] = useState(0);
  const [bookings, setBookings] = useState([]);
  return (
    <>
      {(ticket?.status !== 'PAID')
        &&
        <StyledHotelContainer>
          <StyledTypography variant="colorTextSecondary">
            Você precisa realizar o pagamento do seu ingresso!
          </StyledTypography>

        </StyledHotelContainer>

      }
      {(!ticket?.TicketType.includesHotel)
        &&
        <StyledHotelContainer>
          <StyledTypography variant="colorTextSecondary">
            O seu ingresso não inclui hotel!
          </StyledTypography>
        </StyledHotelContainer>

      }

      {(!hotels && !loadingHotels)
        &&
        <StyledHotelContainer>
          <StyledTypography variant="colorTextSecondary">
            Não foi possível encontrar hotéis disponíveis!
          </StyledTypography>

        </StyledHotelContainer>
      }

      {(ticket?.status === 'PAID' && ticket?.TicketType.includesHotel && hotels)
        &&
        <>
          <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
          <StyledTypography variant="colorTextSecondary">Primeiro, escolha seu hotel</StyledTypography>
          <StyledHotels>
            {hotels.map(item => (<SelectHotel item={item} hotelId={item.id} setBookings={setBookings} setSelectedHotel={setSelectedHotel} selectedHotel={selectedHotel}/>))}
          </StyledHotels>
        </>}

      {(selectedHotel !== 0 )
        &&
        <StyledRoomsContainer>
          <StyledTypography variant="colorTextSecondary">Ótima pedida! Agora escolha seu quarto:</StyledTypography>
          <StyledRoomsWrapper>
            {bookings.map(item => <Room item={ item }></Room>)}
          </StyledRoomsWrapper>

        </StyledRoomsContainer>}
    </>
  );
};

const StyledTypography = styled(Typography)`
      margin-bottom: 20px !important;

      `;
const StyledHotels = styled.div`
      display: flex;
      width: 860px;
      flex-wrap: wrap;
      align-items: center;
      `;
const StyledHotelContainer = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 500px;
      `;
const StyledRoomsContainer = styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 52px;
      `;
const StyledRoomsWrapper = styled.div`
      display: flex;
      flex-wrap: wrap;
      margin-top: 32px;
      gap: 17px;
`;

