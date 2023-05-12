import styled from 'styled-components';

export default function SelectHotel({ item }) {
  return (
    <StyledHotel>

      <img src={item.image} alt='logo' />
      <h2 variant="h6">{item.name}</h2>
      <h3 variant="h1">Tipos de acomodação:</h3>
      <h4 variant="subtitle2">Inserir info dos tipos de quarto</h4>
      <h3 variant="subtitle2">Vagas disponíveis:</h3>
      <h4 variant="subtitle2">Nº total de vagas disponiveis</h4>

    </StyledHotel>
  );
};

const StyledHotel = styled.div`
width: 196px;
min-height:300px;
background: #EBEBEB;
border-radius: 10px;
margin-top:18px ;
padding:16px 14px;
margin-right:19px ;

img{
  width: 168px;
  height: 109px;
  border-radius: 5px;
}
h2{
  font-size: 20px;
  font-weight:400;
  color:#343434;
  margin-top: 10px;
}
h3{
  font-size: 12px;
  font-weight:700;
  color:#3C3C3C;
  margin-top: 14px;
}
h4{
  font-size: 12px;
  font-weight:400;
  color:#343434;
  margin-top: 2px;
}
`;
