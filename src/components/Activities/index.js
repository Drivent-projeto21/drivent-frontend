/* eslint-disable indent */
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useContext } from 'react';
import TicketInfoContext from '../../contexts/TicketInfoContext';
import Generic from './Generic';
import ActivitiesPerDay from './ActivitiesPerDay';

export default function ActivitiesComponent() {
    const { ticketInfo } = useContext(TicketInfoContext);    
    
    return (
            <>
                <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
                {!ticketInfo || ticketInfo?.status !== 'PAID' ? 
                    <Generic>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</Generic>
                    :
                    ticketInfo.TicketType.isRemote ?
                        <Generic>Sua modalidade de ingresso não necessita escolher
                        atividade. Você terá acesso a todas as atividades.</Generic>
                        : 
                        <ActivitiesPerDay />
                }
            </>
        );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
