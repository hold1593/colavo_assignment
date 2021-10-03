import styled from "styled-components";

const TotalPrice = styled.p`
  font-size: 20px;
`;

interface Props {
  currencyCode : string;
}

const Total:React.FC<Props> = (props: Props) => {
  return(
    <>
    {/* console.log(props.currencyCode) */}
      <p>합계</p>
      <TotalPrice>0원</TotalPrice>
    </>
  )
}
export default Total;