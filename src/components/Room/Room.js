import styled from 'styled-components';
import { VacancyFree, VacancyOccupied, VacancySelected } from './Icons';

function renderIcons(item) {
  let icons = [];
  let booked = item._count.Booking;
  let available = item.capacity - booked;
  let locked = false;

  if (available === 0) {
    for (let i = 0; i < item.capacity; i++) {
      icons.push(<VacancySelected></VacancySelected>);
    }
    locked = true;
    return { icons, locked };
  }
  if (available !== 0) {
    for (let i = 0; i < available; i++) {
      icons.push(<VacancyFree></VacancyFree>);
    }
  }
  if (booked !== 0) {
    for (let i = 0; i < booked; i++) {
      icons.push(<VacancyOccupied></VacancyOccupied>);
    }
  }
  return { icons, locked };
}

export default function Room({ item }) {
  let { icons, locked } = renderIcons(item);
  return (
    <StyledRoom locked={locked}>
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
  background-color: ${({ locked }) => (locked ? '#CECECE' : 'white')};
  h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
`;

