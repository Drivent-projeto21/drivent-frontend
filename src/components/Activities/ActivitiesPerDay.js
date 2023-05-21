/* eslint-disable indent */
import styled from 'styled-components';
import dayjs from 'dayjs';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import useActivities from '../../hooks/api/useActivity';
import useVenue from '../../hooks/api/useVenue';
import VenueDiv from './VenueDiv';

const updateLocale = require('dayjs/plugin/updateLocale');
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekdays: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
  ]
});

export default function ActivitiesPerDay() {
    const { getActivities } = useActivities();
    const [activities, setActivities] = useState([]);
    const [activitiesDays, setActivitiesDays]= useState([]);
    const [chosenDay, setChosenDay] = useState(null);
    const { venues } = useVenue();
    const [filteredActivities, setFilteredActivities] = useState([]);

    useEffect( async() => {
        const activities = await getActivities();

        if (activities.length > 0) {
            setActivities(activities);
            const uniqueDatesSet = new Set();
            activities.forEach(activity => {
                const startDate = dayjs(activity.startsAt).format('YYYY-MM-DD');
                uniqueDatesSet.add(startDate);
            });
            setActivitiesDays(Array.from(uniqueDatesSet));             
        }
    }, [chosenDay]);

    function filterByDay(day) {
        setChosenDay(day);
        const filtered = activities.filter((e) => dayjs(e.startsAt).format('YYYY-MM-DD') === day);
        setFilteredActivities(filtered);
    }
    
    return (
            <>
                {chosenDay ? 
                '' : <StyledTypography variant="colorTextSecondary">Primeiro, filtre pelo dia do evento:</StyledTypography>}
                <ButtonDiv>
                    {activitiesDays.length > 0 &&
                        activitiesDays.sort((date1, date2) => new Date(date1) - new Date (date2)).map((day, index) =>
                        <ChooseDayButton onClick={() => filterByDay(day)} key={index} chosenDay={chosenDay} day={day}>
                            {dayjs(day).format('dddd, DD/MM')}
                        </ChooseDayButton>
                        )
                    }
                </ButtonDiv>
                {(chosenDay && filteredActivities.length > 0 && venues) && 
                    <VenueContainer>
                        {venues?.map((venue, index) =>
                         <VenueDiv key={'venue' + index} venue={venue} activities={filteredActivities}/>)}
                    </VenueContainer>
                }
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
    flex-wrap: wrap;
`;

const ChooseDayButton = styled.div`
    min-width: 131px;
    padding: 0px 5px;
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

const VenueContainer = styled.div`
    display:flex;
    width:100%;
    margin-top: 60px;
`;
