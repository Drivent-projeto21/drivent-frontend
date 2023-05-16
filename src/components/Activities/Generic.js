/* eslint-disable indent */
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export default function Generic({ children }) {
    return (
        <StyledContainer>
            <StyledTypography variant="colorTextSecondary">{ children }</StyledTypography>
        </StyledContainer>
    );
}

const StyledTypography = styled(Typography)`
    margin-bottom: 20px !important;
    text-align: center;
`;

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
`;
