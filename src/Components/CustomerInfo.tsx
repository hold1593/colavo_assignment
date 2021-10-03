import styled from "styled-components";

const Customer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 5rem;
`;
const CustomerName = styled.p`
  font-size: 17px;
  `;
const Date = styled.p`
  font-size: 14px;
  color: #9e9e9e;
`;

const CustomerInfo = () => {
  return(
    <Customer>
      <CustomerName>조미현님</CustomerName>
      <Date>2021.10.03 오전 11:30</Date>
    </Customer>
  );
}
export default CustomerInfo;