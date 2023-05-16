/* eslint-disable indent */
import styled from 'styled-components';
import dayjs from 'dayjs';
import Typography from '@material-ui/core/Typography';
import EventInfoContext from '../../contexts/EventInfoContext';
import { useContext, useState } from 'react';

const updateLocale = require('dayjs/plugin/updateLocale');
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekdays: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
  ]
});

function getEventDays(startsAt, endsAt) {
    const startDate = new Date(startsAt);
    const endDate = new Date(endsAt);
    const days = [];

    while (startDate <= endDate) {
        const formattedDate = dayjs(startDate).format('dddd, DD/MM');
        days.push(formattedDate);
    
        startDate.setDate(startDate.getDate() + 1);
      }

  return days;
}

export default function ActivitiesPerDay() {
    const { eventInfo } = useContext(EventInfoContext);
    const days = getEventDays(eventInfo.startsAt, eventInfo.endsAt);
    const [chosenDay, setChosenDay] = useState(null);

    function filterByDay(day) {
        setChosenDay(day);
        const newDate = dayjs(day.substring(day.length - 5), 'DD/MM');
        console.log(newDate.format('YYYY-DD-MM'));
    }
    
    return (
            <>
                {chosenDay ? 
                '' : <StyledTypography variant="colorTextSecondary">Primeiro, filtre pelo dia do evento:</StyledTypography>}
                <ButtonDiv>
                    {days.map((day, index) => 
                        <ChooseDayButton onClick={() => filterByDay(day)} key={index} chosenDay={chosenDay} day={day}>{day}</ChooseDayButton>
                    )}
                </ButtonDiv>
            </>
        );
}

const StyledTypography = styled(Typography)`
      font-size: 20px;
      margin-bottom: 20px !important;
`;

const ButtonDiv = styled.div`
    display:flex;
    column-gap: 17px;
    margin-top: 35px;
`;

const ChooseDayButton = styled.div`
    width: 131px;
    height: 37px;

    background: ${({ day, chosenDay }) => day === chosenDay ? '#FFD37D' : '#E0E0E0'};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;

    font-family: 'Roboto';
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;
