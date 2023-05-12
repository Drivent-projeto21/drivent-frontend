/* eslint-disable indent */
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

export function validateCardData(value) {
    let validCardData = true;

    const validations = {
        name: {
            isValid: isValidString(value?.name),
            message: 'Digite um nome válido',
        },
      
        number: {
            isValid: value?.number.replaceAll(' ', '').length === 16 && (!isNaN(Number(value?.number.replaceAll(' ', '')))),
            message: 'Digite um número de cartão válido',
        },
      
        expiry: {
            isValid: isValidDate(value.expiry),
            message: 'Digite uma data de expiração válida',
        },
      
        cvc: {
            isValid: value?.cvc.length === 3 && (!isNaN(Number(value?.cvc))),
            message: 'Digite um CVC válido',
        },
      
      };

      for (const value of Object.values(validations)) {
        if (!value.isValid) {
          toast.error(value.message, { containerId: 'error' });
          validCardData = false;
        }
      }
      
      function isValidString(value) {
        return value || value?.trim();
      }

      function isValidDate(value) {
        return dayjs(value).isValid();
      }

      return validCardData;
}

export function verifyIssuer(cardNumber) {
  const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercardPattern = /^5[1-5][0-9]{0,14}|^(222[1-9]|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{0,12}/;
  if (visaPattern.test(cardNumber.replaceAll(' ', '')))return 'VISA';
  if (mastercardPattern.test(cardNumber.replaceAll(' ', ''))) return 'MASTERCARD';
  return 'VISA';
}
