/* eslint-disable indent */
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import getEnrollment from '../../hooks/api/useEnrollment';
import UserWithoutEnrollment from './UserWithoutEnrollment';

export default function Payment() {
  const { enrollment } = getEnrollment();
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <MainScr>{enrollment ? <h3>Enrollment</h3> : <UserWithoutEnrollment />}</MainScr>
    </>
  );
}

const MainScr = styled.div`
  display: flex;
  margin: 200px 150px;
  padding: 0 120px;
  text-align: center;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
