/* eslint-disable indent */
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import SelectHotel from '../../../components/Hotel/SelectHotel';
import getHotels from '../../../hooks/api/useHotel';

export default function Hotel() {
  const { hotels, loadingHotels } = getHotels();
  console.log(hotels);
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <StyledTypography variant="colorTextSecondary">Primeiro, escolha seu hotel</StyledTypography>
      {hotels 
      && 
      <StyledHotels>
    {hotels.map(item => (
      <SelectHotel item={item}/>
    ))
    }

     </StyledHotels>
      
      }
    
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;

`;
const StyledHotels = styled.div`
display: flex;
width: 860px;
flex-wrap: wrap;
align-items: center;
height: 200px;



`;

