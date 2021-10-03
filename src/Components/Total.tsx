import styled from "styled-components";

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  align-items: center;
`;
const TotalPrice = styled.p`
  font-size: 20px;
`;

interface Props {
  currencyCode : string;
  totalPr: number;
}

const Total = (props: Props) => {
  return(
    <TotalSection>
      <p>합계</p>
      <TotalPrice>{props.totalPr}원</TotalPrice>
    </TotalSection>
  )
}
export default Total;