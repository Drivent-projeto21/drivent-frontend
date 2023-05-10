/* eslint-disable indent */
import { styled } from '@material-ui/core';
import { Typography } from '@material-ui/core';

export default function UserWithoutEnrollment() {
  return (
    <>
      <StyledTypography variant="colorTextSecondary">
        Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso{' '}
      </StyledTypography>
    </>
  );
}

const StyledTypography = styled(Typography)``;
