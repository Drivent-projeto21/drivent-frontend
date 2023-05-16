/* eslint-disable indent */
import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useState, useContext } from 'react';
import InputMask from 'react-input-mask';
import { validateCardData, verifyIssuer } from './validateCardData';
import useProcessPayment from '../../hooks/api/useProcessPayment';
import { toast } from 'react-toastify';
import TicketInfoContext from '../../contexts/TicketInfoContext';

export default function CreditCardForm( { setPaymentProcessed, ticket } ) {
    const { refreshTicket } = useContext(TicketInfoContext);
    const [form, setForm] = useState({
        cvc: '',
        expiry: '',
        name: '',
        number: '',
        issuer: ''
      });
    const { processPaymentLoading, processPayment } = useProcessPayment();

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function submitPayment(e) {
        e.preventDefault();
        const valid = validateCardData(form);
        if (!valid) return;

        const issuer = verifyIssuer(form.number);

        const newData = {
            ticketId: ticket?.id,
            cardData: {
                issuer: issuer,
                number: Number(form.number.replaceAll(' ', '')),
                name: form.name,
                expirationDate: form.expiry,
                cvv: Number(form.cvc)
	        }
        };
        try {
            await processPayment(newData);
            setPaymentProcessed(true);
            await refreshTicket();
            toast('Pagamento feito com sucesso!');
        } catch (error) {
            toast('Não foi possível finalizar o pagamento!');
        }
    }
  
    return(
        <>
        <CardDiv>
            <Cards
                number={form.number}
                name={form.name}
                expiry={form.expiry}
                cvc={form.cvc}
            />
            <Form onSubmit={submitPayment}>
                <InputMask 
                    name="number"
                    type='text'
                    required
                    mask="9999 9999 9999 9999"
                    maskChar={''}
                    placeholder="Número do Cartão"
                    onChange={handleForm}
                    value={form.number}
                />
                <span>E.g.: 49.., 51.., 36.., 37..</span>
                <InputMask 
                    name="name"
                    type='text'
                    required
                    pattern={'/^[a-zA-Z\s]*$/'}
                    placeholder="Nome"
                    onChange={handleForm}
                    value={form.name}
                />
                <AuxDiv>
                    <InputMask 
                        name="expiry"
                        type='text'
                        mask="99/99"
                        maskChar={''}
                        placeholder="Expiração"
                        onChange={handleForm}
                        value={form.expiry}
                    />
                    <InputMask 
                        name="cvc"
                        mask='999'
                        maskChar={''}
                        placeholder="CVC"
                        onChange={handleForm}
                        value={form.cvc}
                    />
                </AuxDiv>
        </Form>
        </CardDiv>
        <SubmitButton disabled={processPaymentLoading} type='submit' onClick={submitPayment}>FINALIZAR PAGAMENTO</SubmitButton>
        </>
  );
}

const CardDiv= styled.div`
    div{
        margin: 0px;
        padding: 0px;
    }
    display: flex;
    padding: 11px 0px;
    max-width: 706px;
    width:100%;
`;

const Form = styled.form`
    display:flex;
    flex-direction: column;
    margin-left: 15px;
    width: 100%;
    row-gap: 10px;
    input {
        height: 45px;
        border-radius: 4px;
        border: 1px solid #979696;
        font-size: 16px;
        width: 100%;
        padding: 10px;
    }
    span {
        font-family: 'Roboto';
        font-size: 15px;
        font-weight: 400;
        color: #979696;
    }
`;

const AuxDiv = styled.span`
    display: flex;
    width: 100%;
    column-gap: 20px;
`;

const SubmitButton = styled.button`
    width: 182px;
    height: 37px;
    background: #E0E0E0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    font-family: 'Roboto';
    font-weight: 400;
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
