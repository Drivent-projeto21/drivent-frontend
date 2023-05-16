/* eslint-disable indent */
import { useState } from 'react';
import CreditCardForm from './CreditCardForm';
import styled from 'styled-components';
import TicketInfo from './TicketInfo';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function TicketAndPayment({ ticket }) { 
    const [paymentProcessed, setPaymentProcessed] = useState(false);

    return (
      <>
      <SubTitle>Ingresso Escolhido</SubTitle>
      <TicketInfo ticket={ticket}/>
      <SubTitle>Pagamento</SubTitle>
      { 
        ticket?.status === 'PAID' || paymentProcessed ? 
            <ProcessedPaymentDiv>
                <Icon />
                <div>
                    <h3>Pagamento processado!</h3>
                    <h4>Prossiga para escolha de hospedagem e atividades</h4>
                </div>
            </ProcessedPaymentDiv> 
        : 
            <CreditCardForm  setPaymentProcessed={setPaymentProcessed} ticket={ticket}/>
        }
      </>
    );
}

const SubTitle = styled.h2`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
`;

const Icon = styled(AiFillCheckCircle)`
    width: 44px;
    height: 44px;
    color: green;
`;

const ProcessedPaymentDiv = styled.div`
    display: flex;
    column-gap: 12px;
    align-items: center;
    font-family: 'Roboto';
    margin-top: 15px;
    h3 {
        
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #454545;
    }
    p {
        font-weight: 400;
        font-size: 15px;
        line-height: 19px;
        color: #000000;
    }
`;
