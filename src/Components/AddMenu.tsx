import React, { useState } from 'react';
import { Modal, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Total from '../Components/Total';
import styled from 'styled-components';
import '../my_custom.css';

const ButtonSection = styled.section`
  display: flex;
`;
const MenuList = styled.div`
  height: 500px;
  width: 400px;
`;
const MenuBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 10px;
`;
const MenuName = styled.div`
  font-size: 15px;
`;
const ItemName = styled.p`
  font-size: 16px;
  font-weight : bold;
`;
const Price = styled.p`
  font-size: 13px;
`;
const ModalUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  `;
const ModalLi = styled.li`
  margin-bottom: 15px;
  `;
const ModalInput = styled.input`
  margin-right: 15px;
  cursor: pointer;
`;

const { Option } = Select;

interface Props {
  item : [];
  discount: [];
  currencyCode: string;
}
const AddMenu = ({item, discount, currencyCode}: Props) => {
  const [surgeryModal, setSurgeryModal] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);

  const showSurgeryModal = () => {
    setSurgeryModal(true);
  };

  const handleOkSurgery = () => {
    setSurgeryModal(false);
  };

  const handleCancelSurgery = () => {
    setSurgeryModal(false);
  };

  const showDiscountModal = () => {
    setDiscountModal(true);
  };

  const handleOkDiscount = () => {
    setDiscountModal(false);
  };

  const handleCancelDiscount = () => {
    setDiscountModal(false);
  };

  const handleChange = (value:string) => {
    console.log(`selected ${value}`);
  }

  return(
    <>
      <ButtonSection>
        <Button type="primary" onClick={showSurgeryModal} icon={<PlusOutlined />} >
          시술 추가
        </Button>
        <Modal title="시술 메뉴" visible={surgeryModal} onOk={handleOkSurgery} onCancel={handleCancelSurgery}>
          <ModalUl>
          {
            Object.entries(item).map((e,idx) => {
              return(
                <ModalLi key={idx}>
                  <ModalInput type='checkbox' id={e[1]['name']}/>
                  <label htmlFor={e[1]['name']}>{e[1]['name']}</label>
                  <p>{e[1]['price']}원</p>
                </ModalLi>
              )
            })
          }   
          </ModalUl>
        </Modal>
        <Button type="default" onClick={showDiscountModal} icon={<PlusOutlined />} >
          할인 추가
        </Button>
        <Modal title="할인" visible={discountModal} onOk={handleOkDiscount} onCancel={handleCancelDiscount}>
          <ModalUl>
          {
            Object.entries(discount).map((e,idx) => {
              return(
                <ModalLi key={idx}>
                  <ModalInput type='checkbox' id={e[1]['name']}/>
                  <label htmlFor={e[1]['name']}>{e[1]['name']}</label>
                  <p>{Math.floor(e[1]['rate']*100)}%</p>
                </ModalLi>
              )
            })
          }
          </ModalUl>
        </Modal>
      </ButtonSection>
      <hr style={{ width: 500 }}/>
      <MenuList>
        <MenuBox>
          <MenuName>
            <ItemName>학생컷</ItemName>
            <Price>15,000원</Price>
          </MenuName>
          <Select defaultValue="1" style={{ width: 60 }} onChange={handleChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </MenuBox>
      </MenuList>
      <hr style={{ width: 500 }}/>
      <Total currencyCode={currencyCode}/>
    </>
  );
}
export default AddMenu;