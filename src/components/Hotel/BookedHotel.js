/* eslint-disable indent */
import { useEffect } from 'react';
import getBookings from '../../hooks/api/useBooking';
import { StyledHotel } from './SelectHotel';
import { useState } from 'react';

export function BookedHotel({ finishedBooking }) {
    const hotel = finishedBooking.Room.Hotel;
    const room = finishedBooking.Room;
    const { bookings } = getBookings(hotel.id);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if (bookings) {
            setFiltered(bookings?.filter((el) => el.id = room.id));
        }
    }, [bookings]);

    return (
        <StyledHotel>
                <img src={hotel.image} alt='logo' />
                <h2 variant="h6">{hotel.name}</h2>
                <h3 variant="h1">Quarto Reservado</h3>
                <h4 variant="subtitle2">
                    {room.name + ' '}
                    {room.capacity === 3 ? '(Triple)' : room.capacity === 2 ? '(Double)' : '(Single)'}</h4>
                <h3 variant="subtitle2">Pessoas no seu quarto</h3>
                <h4 variant="subtitle2">{filtered.length > 0 ? `Você e mais ${filtered[0]._count.Booking - 1}` : ''}</h4>
        </StyledHotel>
    );
}
