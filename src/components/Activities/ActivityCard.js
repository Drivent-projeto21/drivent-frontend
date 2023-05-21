/* eslint-disable indent */
import { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { CgEnter } from 'react-icons/cg';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export default function ActivityCard({ activity }) {
    const [noVacancies, setNoVacancies] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const diff = (dayjs(activity.endsAt).diff(dayjs(activity.startsAt), 'minute') / 60);

    useEffect(() => {
        if (activity.vacancies === 0 || activity.Subscriptions.length === activity.vacancies) setNoVacancies(true);
        if (activity.Subscriptions.length > 0) setIsSubscribed(true);
    }, []);

    function subscribe() {
        const endsAt = dayjs(activity.endsAt);
        if (endsAt.isBefore(dayjs())) {
            return toast.error('Essa atividade já foi encerrada, escolha outra!', { containerId: 'error' });
        }
        
        const body = { activityId: activity.id };
        console.log(body);
    }

    return (
        <ActivityBox diff={diff} isSubscribed={isSubscribed}>
            <LeftDiv>
                <h2>{activity.name}</h2>
                <p>{`${dayjs(activity.startsAt).format('HH:mm')} - ${dayjs(activity.endsAt).format('HH:mm')}`}</p>
            </LeftDiv>
            <Border isSubscribed={isSubscribed}/>
            <IconDiv isSubscribed={isSubscribed}  noVacancies={noVacancies}>
                {noVacancies ? 
                    <>
                        <NoVacanciesCircle />
                        <RedParagraph>Esgotado</RedParagraph>
                    </>
                :   isSubscribed ? 
                        <>
                            <SubscribedIcon />
                            <GreenParagraph>Incrito</GreenParagraph>
                        </>

                    :
                        <>
                            <SubscribeIcon onClick={subscribe}/>
                            <GreenParagraph>{activity.vacancies - activity._count.Subscriptions} vagas</GreenParagraph>
                        </>
                }
            </IconDiv>
        </ActivityBox>
    );
}

const ActivityBox = styled.div`
    width: 100%;
    height: calc(80px * ${props => props.diff});
    background: ${props => props.isSubscribed ? '#D0FFDB' : '#F1F1F1'};
    border-radius: 5px;
    display: flex;
    padding: 10px;
`;

const LeftDiv = styled.div`
    display:flex;
    min-width:165px;
    margin-right: 15px;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 6px;
    font-size: 12px;
    line-height: 14px;
    color: #343434;
    h2 {
        font-weight: 700;
    }
    p {
        font-weight: 400;
    }
`;

const Border = styled.div`
    min-height: 100%;
    background: ${props => props.isSubscribed ? '#99E8A1' : '#CFCFCF'};
    width: 1px;
`;

const IconDiv = styled.div`
    display: flex;
    width: 100%;
    margin-left: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    height: 100%;
    &:hover {
        cursor:${props => props.isSubscribed || props.noVacancies ? 'auto' : 'pointer'};
    }
`;

const NoVacanciesCircle = styled(AiOutlineCloseCircle)`
    width: 18px;
    height: 18px;
    color: #CC6666;
`;

const SubscribeIcon = styled(CgEnter)`
    width: 18px;
    height: 18px;
    color: #078632;
`;

const SubscribedIcon = styled(BsCheckCircle)`
    width: 18px;
    height: 18px;
    color: #078632;
`;

const RedParagraph = styled.p`
    color: #CC6666;
    margin-top: 5px;
`;

const GreenParagraph = styled.p`
    color: #078632;
    margin-top: 5px;
`;
