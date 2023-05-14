import styled from 'styled-components';
import { IoPersonOutline, IoPerson } from 'react-icons/io5';

const VacancyOccupied = styled(IoPerson)`
  color: black;
  font-size: 27px;
`;
const VacancySelected = styled(IoPerson)`
  font-size: 27px;
  color: #ef5c90;
`;
const VacancyFree = styled(IoPersonOutline)`
  color: black;
  font-size: 27px;
`;

const FullRoom = styled(IoPerson)`
  color: #8C8C8C;
  font-size: 27px;
`;

export { VacancyOccupied, VacancyFree, VacancySelected, FullRoom };
