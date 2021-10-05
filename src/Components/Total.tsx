import styled from "styled-components";

const TotalSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-bottom: 5rem;
`;

const Price = styled.p`
  font-size: 15px;
`;
const TotalPrice = styled(Price)`
  font-size: 20px;
`;
const TotalP = styled.p`
  font-size: 20px;
`;

const OriDiv=styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;
const DisDiv = styled(OriDiv)``;
const TotalDiv = styled(OriDiv)`
`;

interface Props {
  currencyCode : string;
  oriPr : number;
  disTotal: number;
}

 // 천단위 , 정규식
 const Total = (props: Props) => {

  const priceToString = (price:number) =>{
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return(
    <TotalSection>
      <OriDiv>
        <p>시술</p>
        <Price>{priceToString(props.oriPr)}원</Price>
      </OriDiv>
      <DisDiv>
        <p>할인</p>
        <Price>{priceToString(props.disTotal)}원</Price>
      </DisDiv>
      <TotalDiv>
        <TotalP>합계</TotalP>
        <TotalPrice>{priceToString(props.oriPr-props.disTotal)}원</TotalPrice>
      </TotalDiv>
    </TotalSection>
  )
}
export default Total;