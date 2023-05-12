/* eslint-disable indent */
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import SelectHotel from '../../../components/Hotel/SelectHotel';
import getHotels from '../../../hooks/api/useHotel';
import getTicket from '../../../hooks/api/useTicket';

export default function Hotel() {
  const { ticket } = getTicket();
  const { hotels, loadingHotels } = getHotels();

  return (
    <>

      {(ticket?.status !== 'PAID')
        &&
        <StyledHotelContainer>
          <StyledTypography variant="colorTextSecondary">
            Você precisa realizar o pagamento do seu ingresso!
          </StyledTypography>

        </StyledHotelContainer>

      }
      {(!ticket?.TicketType.includesHotel)
        &&
        <StyledHotelContainer>
          <StyledTypography variant="colorTextSecondary">
            O seu ingresso não inclui hotel!
          </StyledTypography>
        </StyledHotelContainer>

      }

      {(!hotels && !loadingHotels) 
      &&
      <StyledHotelContainer>
      <StyledTypography variant="colorTextSecondary">
        Não foi possível encontrar hotéis disponíveis!
      </StyledTypography>

    </StyledHotelContainer>
      }

      {(ticket?.status === 'PAID' && ticket?.TicketType.includesHotel && hotels)
        &&
        <>
          <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
          <StyledTypography variant="colorTextSecondary">Primeiro, escolha seu hotel</StyledTypography>
          <StyledHotels>
            {hotels.map(item => (<SelectHotel item={item} />))}
          </StyledHotels>
        </>}

    </>
  );
};

const StyledTypography = styled(Typography)`
      margin-bottom: 20px !important;

      `;
const StyledHotels = styled.div`
      display: flex;
      width: 860px;
      flex-wrap: wrap;
      align-items: center;
   
      `;
const StyledHotelContainer = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 500px;
      `;
