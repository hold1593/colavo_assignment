import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddMenu from '../Components/AddMenu';
import Nav from '../Components/Nav';
import CustomerInfo from '../Components/CustomerInfo';
import axios from 'axios';

const CartSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

interface IProps {
  currencyCode: string;
  item: [];
  discount: [];
}
const Cart = () => {
  const [currencyCode, setCurrencyCode] = useState<IProps['currencyCode']>('');
  const [item, setItem] = useState<IProps['item']>([]);
  const [discount, setDiscount] = useState<IProps['discount']>([]);

  const getData = async() => {
    await axios.get('https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData')
    .then(res => {
      setItem(res.data['items']);
      setDiscount(res.data['discounts']);
      setCurrencyCode(res.data['currency_code']);
    });
  }

  useEffect(() => {
    getData()
  },[]);

  return(
    <CartSection>
      <Nav />
      <CustomerInfo /> 
      <AddMenu item={item} discount={discount} currencyCode={currencyCode}/>
    </CartSection>
  )
}
export default Cart;