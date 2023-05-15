/* eslint-disable indent */
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import SelectHotel from '../../../components/Hotel/SelectHotel';
import Room from '../../../components/Room/Room';
import getHotels from '../../../hooks/api/useHotel';
import getTicket from '../../../hooks/api/useTicket';
import { useState } from 'react';
import useUserBooking from '../../../hooks/api/useUserBooking';
import useSaveBooking from '../../../hooks/api/useSaveBooking';
import { BookedHotel } from '../../../components/Hotel/BookedHotel';
import { useEffect } from 'react';
import useUpdateBooking from '../../../hooks/api/useUpdateBooking';

export default function Hotel() {
  const { ticket } = getTicket();
  const { hotels, loadingHotels } = getHotels();
  const { userBooking, getUserBooking } = useUserBooking();
  const { updateBooking } = useUpdateBooking();
  const { saveBooking } = useSaveBooking();
  const [selectedHotel, setSelectedHotel] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [finishedBooking, setFinishedBooking] = useState(null);
  const [changeReservation, setChangeReservation] = useState(false);

  useEffect( async() => {
    if (userBooking) {
      setFinishedBooking(userBooking);
    }
  }, [userBooking]); 

  async function handleBooking() {
    const body = { roomId: selectedRoom };
    if (changeReservation) {
      try {
        await updateBooking(body, finishedBooking.id);
        toast('Troca feita com sucesso!');
        const updatedBooking = await getUserBooking();
        setFinishedBooking(updatedBooking);
        setChangeReservation(false);
        return;
      } catch (error) {
        toast('Não foi possível efetuar a troca de quarto!');
        return;
      }
    }

    try {
      await saveBooking(body);
      toast('Quarto reservado com sucesso!');
      const savedBooking = await getUserBooking();
      setFinishedBooking(savedBooking);
    } catch (error) {
      toast('Não foi possível reservar o seu quarto!');
    }
  }

  return (
    <>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {(ticket?.status !== 'PAID')
        &&
        <StyledHotelContainer>
          <StyledTypography variant="colorTextSecondary">
            Você precisa realizar o pagamento do seu ingresso!
          </StyledTypography>
        </StyledHotelContainer>
      }

      {(ticket?.status === 'PAID' && !ticket?.TicketType.includesHotel)
        &&
        <StyledHotelContainer>
          <StyledTypography variant="colorTextSecondary">
            O seu ingresso não inclui hotel!
          </StyledTypography>
        </StyledHotelContainer>
      }

      {(ticket?.status === 'PAID' && ticket?.TicketType.includesHotel) && (!hotels && !loadingHotels)
        &&
        <StyledHotelContainer>
          <StyledTypography variant="colorTextSecondary">
            Não foi possível encontrar hotéis disponíveis!
          </StyledTypography>
        </StyledHotelContainer>
      }

      {finishedBooking && !changeReservation ?
        <>
          <BookedHotel finishedBooking={finishedBooking}/>
          <BookRoomButton 
          onClick={() => {
            setSelectedHotel(0);
            setSelectedRoom(0);
            setChangeReservation(true);
          }}>TROCAR DE QUARTO</BookRoomButton>
        </>
      :
        <>
        {(ticket?.status === 'PAID' && ticket?.TicketType.includesHotel && hotels)
          &&
          <>
            
            <StyledTypography variant="colorTextSecondary">Primeiro, escolha seu hotel</StyledTypography>
            <StyledHotels>
              {hotels.map(item => 
                (<SelectHotel 
                key ={`hotel${item.id}`}item={item} hotelId={item.id} setBookings={setBookings} setSelectedHotel={setSelectedHotel} selectedHotel={selectedHotel}/>))}
            </StyledHotels>
          </>}

        {(selectedHotel !== 0 )
          &&
          <StyledRoomsContainer>
            <StyledTypography variant="colorTextSecondary">Ótima pedida! Agora escolha seu quarto:</StyledTypography>
            <StyledRoomsWrapper>
              {bookings.map(item => 
              <Room 
              item={ item } roomId={item.id} setSelectedRoom={setSelectedRoom} key={`room${item.id}`}
              selectedRoom={selectedRoom} finishedBooking={finishedBooking} changeReservation={changeReservation} ></Room>)}
            </StyledRoomsWrapper>
          </StyledRoomsContainer>}

        {(selectedRoom !== 0)
        &&
          <BookRoomButton onClick={handleBooking}>RESERVAR O QUARTO</BookRoomButton>
        }
        </>
        }
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
const BookRoomButton = styled.button`
    width: 182px;
    height: 37px;
    background: #E0E0E0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    border: none;
    color: #000000;
    margin-top: 35px;
    &:hover{
        cursor:pointer;
        background: #a0a0a0;
    }
`;
