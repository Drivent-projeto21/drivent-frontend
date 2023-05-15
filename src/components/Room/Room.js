import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FullRoom, VacancyFree, VacancyOccupied, VacancySelected } from './Icons';
import { useEffect, useState } from 'react';

function renderIcons(item, selectedRoom, roomId, sameRoom) {
  let icons = [];
  let booked = item._count.Booking;
  let available = item.capacity - booked;
  let locked = false;

  if (available === 0) {
    for (let i = 0; i < item.capacity; i++) {
      icons.push(<FullRoom />);
    }
    locked = true;
    return { icons, locked };
  }
  if (available !== 0) {
    if (selectedRoom === roomId) {
      for (let i = 0; i < available - 1; i++) {
        icons.push(<VacancyFree></VacancyFree>);
      }
      icons.push(<VacancySelected />);
    } else {
      for (let i = 0; i < available; i++) {
        icons.push(<VacancyFree></VacancyFree>);
      }
    }
  }
  if (booked !== 0) {
    for (let i = 0; i < booked; i++) {
      icons.push(<VacancyOccupied same={sameRoom ? 1 : undefined}></VacancyOccupied>);
    }
  }
  return { icons, locked };
}

export default function Room({ item, roomId, setSelectedRoom, selectedRoom, finishedBooking, changeReservation }) {
  const [sameRoom, setSameRoom] = useState(false);
  let { icons, locked } = renderIcons(item, selectedRoom, roomId, sameRoom);

  useEffect(() => {
    if (changeReservation) {
      if (finishedBooking.Room.id === roomId) return setSameRoom(true);
    }
  }, []);

  function selectRoom() {
    if (locked) return;
    if (sameRoom) return (toast('Você já possui uma reserva neste quarto, escolha um diferente!'));
    
    if (selectedRoom === roomId) {
      setSelectedRoom(0);
    } else {
      setSelectedRoom(roomId);
    }
  }

  return (
    <StyledRoom sameRoom={sameRoom} locked={locked} onClick={selectRoom} selectedRoom={selectedRoom} roomId={roomId}>
      <h1>{item.name}</h1>
      <div>
        {icons.map(icon => <>{icon}</>)}
      </div>
    </StyledRoom>
  );
}

const StyledRoom = styled.div`
  width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
  border: 1px solid #CECECE;
  border-radius: 10px;
  color: ${({ locked }) => (locked ? '#8C8C8C' : 'black')};
  background-color: ${({ locked, selectedRoom, roomId, sameRoom }) => 
    (locked || sameRoom? '#CECECE' : selectedRoom === roomId ? '#FFEED2' : 'white')};
  h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
`;

