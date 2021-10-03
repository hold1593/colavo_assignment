import React, { useState } from 'react';
import { Modal, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ItemList from '../Components/ItemList';
import styled from 'styled-components';
import '../my_custom.css';

const ButtonSection = styled.section`
  display: flex;
`;
const MenuList = styled.div`
  display: flex;
`;
const MenuUl = styled.ul`
  list-style: none;
  padding: 0;
`;
const MenuLi = styled.li``;
const ModalUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  `;
const ModalLi = styled.li`
  font-size: 17px;
  cursor: pointer;
  `;
const ModalInput = styled.input`
  margin-right: 15px;
`;

const { Option } = Select;

interface Props {
  item : [];
  discount: [];
}
const AddMenu = ({item, discount}: Props) => {
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
            Object.entries(item).map(e => {
              return(
                <ModalLi>
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
            Object.entries(discount).map(e => {
              return(
                <ModalLi>
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
      <hr style={{ width: 800 }}/>
      <MenuList>
        <MenuUl>
          <MenuLi>
            <p>학생컷</p>
            <p>15,000원</p>
            <Select defaultValue="1" style={{ width: 60 }} onChange={handleChange}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
          </MenuLi>
        </MenuUl>
      </MenuList>
    </>
  );
}
export default AddMenu;