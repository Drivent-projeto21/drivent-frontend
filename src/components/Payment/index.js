/* eslint-disable indent */
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import getEnrollment from '../../hooks/api/useEnrollment';
import UserWithoutEnrollment from './UserWithoutEnrollment';
import TickestType from './TicketsType';

export default function Payment() {
  const { enrollment } = getEnrollment();
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <MainScr>
        {enrollment ? ( 
          <TickestType />
        ) : (
          <NotEnrollScr>
            <UserWithoutEnrollment />
          </NotEnrollScr>
        )}
      </MainScr>
    </>
  );
}

const NotEnrollScr = styled.div`
  display: flex;
  margin: 200px 150px;
  padding: 0 120px;
  text-align: center;
`;

const MainScr = styled.div``;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
