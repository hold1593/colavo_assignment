import styled from "styled-components";

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  align-items: center;
  margin-bottom: 5rem;
`;
const TotalPrice = styled.p`
  font-size: 20px;
`;

interface Props {
  currencyCode : string;
  totalPr: number;
}

 // 천단위 , 정규식
 const Total = (props: Props) => {

  const priceToString = (price:number) =>{
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return(
    <TotalSection>
      <p>합계</p>
      <TotalPrice>{priceToString(props.totalPr)}원</TotalPrice>
    </TotalSection>
  )
}
export default Total;