import styled from 'styled-components';
import getRooms from '../../hooks/api/useRoom';
import getBookings from '../../hooks/api/useBooking';
import { useState, useContext } from 'react';

function getAccommodationTypes(rooms) {
  let accomodations = [];
  let hashmap = {};

  rooms.map(room => hashmap[room.capacity] = true);
  if (hashmap.hasOwnProperty(1)) {
    accomodations.push('Single');
  };
  if (hashmap.hasOwnProperty(2)) {
    accomodations.push('Double');
  };
  if (hashmap.hasOwnProperty(3)) {
    accomodations.push('Triple');
  };
  return accomodations;
};

function parseAccomodations(accomodations) {
  let text = accomodations.join(', ');
  text = text.replace(/,\s([^,]+)$/, ' e $1');
  return text;
};

function getAvailability(bookings) {
  let occupied = 0;
  let total = 0;
  for (let item of bookings) {
    occupied += item._count.Booking;
    total += item.capacity;
  }
  return { occupied, total };
}

export default function SelectHotel({ item, hotelId, setBookings, setSelectedHotel, selectedHotel }) {
  const { rooms } = getRooms(hotelId);
  const { bookings } = getBookings(hotelId);

  let accomodationsText = '';
  let params = 0;

  if (rooms) {
    let accomodations = getAccommodationTypes(rooms.Rooms);
    accomodationsText = parseAccomodations(accomodations);
  }
  if (bookings) {
    params = getAvailability(bookings);
  }
  return (
    <>
      <StyledHotel onClick={() => {
        if (selectedHotel === hotelId) {
          setBookings([]);
          setSelectedHotel(0);
        } else {
          setBookings(bookings);
          setSelectedHotel(hotelId);
        }
      }} selectedHotel={selectedHotel} hotelId={hotelId}>

        <img src={item.image} alt='logo' />
        <h2 variant="h6">{item.name}</h2>
        <h3 variant="h1">Tipos de acomodação:</h3>
        <h4 variant="subtitle2">{accomodationsText}</h4>
        <h3 variant="subtitle2">Vagas disponíveis:</h3>
        <h4 variant="subtitle2">{params.total - params.occupied}</h4>

      </StyledHotel>
    </>
  );
};

const StyledHotel = styled.div`
width: 196px;
min-height:300px;
background-color: ${({ selectedHotel, hotelId }) => (selectedHotel===hotelId ? '#FFEED2' : ' #EBEBEB')};
border-radius: 10px;
margin-top:18px ;
padding:16px 14px;
margin-right:19px ;

img{
  width: 168px;
  height: 109px;
  border-radius: 5px;
}
h2{
  font-size: 20px;
  font-weight:400;
  color:#343434;
  margin-top: 10px;
}
h3{
  font-size: 12px;
  font-weight:700;
  color:#3C3C3C;
  margin-top: 14px;
}
h4{
  font-size: 12px;
  font-weight:400;
  color:#343434;
  margin-top: 2px;
}
`;
