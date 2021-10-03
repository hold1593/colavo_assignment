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
interface myProps {
  arr : any[];
}
const AddMenu = ({item, discount, currencyCode}: Props) => {
  const [surgeryModal, setSurgeryModal] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);
  const [totalPr, setTotalPr] = useState(0);
  const [arr, setArr] = useState<myProps['arr']>([]);
  const [disArr, setDisArr] = useState<myProps['arr']>([]);
  let dumy: any[] = [...arr];
  let dumyDis: any[] = [...disArr];
  
  const showSurgeryModal = () => {
    setSurgeryModal(true);
  };

  const handleCancelSurgery = () => {
    setSurgeryModal(false);
  };

  const showDiscountModal = () => {
    setDiscountModal(true);
  };

  const handleCancelDiscount = () => {
    setDiscountModal(false);
  };

  const handleChange = (e:any) => {
    console.log(e.target)
  }

  const handlePickItem = (e:any) => {
    let data: {name:string, price:string} = {
      name: e.target.id,
      price: e.target.name,
    }
    if(e.target.checked){ // 체크누르면
      dumy.push(data); // newArr에 넣자
    }else{ // 체크해제하면
      for(let i=0; i<dumy.length; i++){
        if(dumy[i]['name'] === e.target.id){ // newArr에 있는지 확인하구 있다면
          dumy.splice(i,1) //없애자
        }
      }
    };
  }

  const handlePickDiscount = (e:any) => {
    let data: {name:string, rate:number} = {
      name: e.target.id,
      rate: e.target.name,
    }
    if(e.target.checked){ // 체크누르면
      dumyDis.push(data); // newArr에 넣자
    }else{ // 체크해제하면
      for(let i=0; i<dumyDis.length; i++){
        if(dumyDis[i]['name'] === e.target.id){ // newArr에 있는지 확인하구 있다면
          dumyDis.splice(i,1) //없애자
        }
      }
    };
  }
  
  const handleOkSurgery = () => {
    setArr(dumy);
    setSurgeryModal(false);
  };

  const handleOkDiscount = () => {
    setDisArr(dumyDis);
    setDiscountModal(false);
  };

  return(
    <>
      <ButtonSection>
        <Button type="primary" onClick={showSurgeryModal} icon={<PlusOutlined />} >
          시술 추가
          {console.log('arr::',arr)}
        </Button>
        <Modal title="시술 메뉴" visible={surgeryModal} onOk={handleOkSurgery} onCancel={handleCancelSurgery}>
          <ModalUl>
          {
            Object.entries(item).map((e,idx) => {
              return(
                <ModalLi key={idx}>
                  <ModalInput type='checkbox' id={e[1]['name']} name={e[1]['price']} onClick={handlePickItem}/>
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
                  <ModalInput type='checkbox' id={e[1]['name']} name={e[1]['rate']} onClick={handlePickDiscount}/>
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
        {
          arr.length > 0 ?
          arr.map((e,idx) => {
            return (
              <MenuBox key={idx}>
                <MenuName>
                  <ItemName>{e.name}</ItemName>
                  <Price>{e.price}원</Price>
                </MenuName>
                <Select defaultValue="1" style={{ width: 60 }} onChange={handleChange} >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                </Select>
              </MenuBox>
            )
          })
          :
          <></>
        }
        {
          disArr.length > 0 ?
            disArr.map((e, idx) => {
              return(
                <MenuBox key={idx}>
                <MenuName>
                  <ItemName>{e.name}</ItemName>
                  <Price>{Math.floor(e.rate*100)}%</Price>
                </MenuName>
                <Select defaultValue="선택" style={{ width: 80 }} >
                  {arr.map((e,idx) => {
                    return (
                      <>
                        <Option key={idx} value={idx}>{e.name}</Option>
                      </>
                    )
                  })}
                </Select>
              </MenuBox>
              )
            })
            :
            <></>
        }
      </MenuList>
      <hr style={{ width: 500 }}/>
      <Total currencyCode={currencyCode} totalPr={totalPr}/>
    </>
  );
}
export default AddMenu;