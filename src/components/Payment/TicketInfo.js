/* eslint-disable indent */
import styled from 'styled-components';

export default function TicketInfo( { ticket } ) {
    return (
      <>
        <TicketInfoDiv>
            <p>{ticket?.TicketType.isRemote ? 'Online' 
            : 
            ticket?.TicketType.includesHotel ? 'Presencial + Com Hotel' : 'Presencial + Sem Hotel'
            }</p>
            <span>R$ {ticket?.TicketType.price}</span>
        </TicketInfoDiv>
      </>
    );
}

const TicketInfoDiv = styled.div`
    width: 290px;
    height: 108px;
    background: #FFEED2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    font-family: 'Roboto';
    font-weight: 400;
    margin-top: 17px;
    margin-bottom: 25px;
    p {
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        color: #454545;
        margin-bottom: 5px;
    }
    span {
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        color: #898989;
    }
`;
