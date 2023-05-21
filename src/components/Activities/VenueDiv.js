/* eslint-disable indent */
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import ActivityCard from './ActivityCard';

export default function VenueDiv({ venue, activities }) {
    const [venueActivities, setVenueActivities] = useState([]);

    useEffect(() => {
        const venueAc = activities.filter((a) => a.venueId === venue.id);
        setVenueActivities(venueAc);
    }, [activities]);
    
    return (
        <Container>
            <StyledName>{venue.name}</StyledName>
            <Box>
                {venueActivities.length > 0 &&
                    venueActivities.map((ac) => <ActivityCard key={'activity' + ac.id} activity={ac}/>)
                }
            </Box>
        </Container>
    );
}

const Container = styled.div`
    max-width: 288px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledName = styled.h1`
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    color: #7B7B7B;
    margin-bottom: 13px;
`;

const Box = styled.div`
    min-height: 390px;
    width: 100%;
    padding: 9px;
    display: flex;
    flex-direction: column;
    row-gap: 9px;
    box-sizing: border-box;
    border: 1px solid #D7D7D7;
`;
