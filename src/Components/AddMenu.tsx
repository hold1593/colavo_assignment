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
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
const SelectCount = styled.select`
  width: 60px;
  height: 30px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 2px;
  padding: 5px;
  -webkit-appearance: none; /* 네이티브 외형 감추기 */ 
  -moz-appearance: none; 
  appearance: none;
  
  &:hover{
    cursor: pointer;
    border: 1px solid #d0b0ff;

  }
`;
const { Option } = Select;

interface Props {
  item : [];
  discount: [];
  currencyCode: string;
}
interface myProps {
  arr : any[];
  prevCount: number;
}
const AddMenu = ({item, discount, currencyCode}: Props) => {
  const [surgeryModal, setSurgeryModal] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);
  const [totalPr, setTotalPr] = useState(0);
  const [arr, setArr] = useState<myProps['arr']>([]);
  const [disArr, setDisArr] = useState<myProps['arr']>([]);
  let data: {name:string, price:number, count: number} = {
    name: '',
    price: 0,
    count : 1,
  }
  let dumy: any[] = [...arr];
  let money: number = 0;
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
    let newArr = [...arr];
    let dumy: {name:string, price:number, count: number} = {
      name : e.target.id,
      price : parseInt(e.target.name),
      count : parseInt(e.target.value),
    }

    for(let i=0; i<newArr.length; i++){
      // arr[i]['name']값이 e.target.id랑 일치하면
      if(newArr[i]['name'] === e.target.id){
        // 더미의 arr[i]를 삭제 후 그자리에 dumy 넣기
        newArr.splice(i,1,dumy);
      }
      money = money + newArr[i]['price']*newArr[i]['count'];
    }
    // 그리고 더미를 arr에 뒤집어씌우기
    setArr(newArr);
    setTotalPr(money);
  }

  const handlePickItem = (e:any) => {
   
    data = {
      name: e.target.id,
      price: parseInt(e.target.name),
      count : parseInt(e.target.classList[2])
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
    for(let i=0; i<dumy.length; i++) {
      money = money + dumy[i]['price'];
    }
    setTotalPr(money);
    setSurgeryModal(false);
  };

  const handleOkDiscount = () => {
    setDisArr(dumyDis);
    setDiscountModal(false);
  };

  // 천단위 , 정규식
  const priceToString = (price:number) =>{
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return(
    <>
      <ButtonSection>
        <Button type="primary" onClick={showSurgeryModal} icon={<PlusOutlined />} >
          시술
        </Button>
        <Modal title="시술 메뉴" visible={surgeryModal} onOk={handleOkSurgery} onCancel={handleCancelSurgery}>
          <ModalUl>
          {
            Object.entries(item).map((e,idx) => {
              return(
                <ModalLi key={idx}>
                  <ModalInput type='checkbox' id={e[1]['name']} name={e[1]['price']} className={e[1]['count']} onClick={handlePickItem}/>
                  <label htmlFor={e[1]['name']}>{e[1]['name']}</label>
                  <p>{priceToString(e[1]['price'])}원</p>
                  <p>수량:{e[1]['count']}</p>
                </ModalLi>
              )
            })
          }   
          </ModalUl>
        </Modal>
        <Button type="default" onClick={showDiscountModal} icon={<PlusOutlined />} >
          할인
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
                  <Price>{priceToString(e.price*e.count)}원</Price>
                </MenuName>
                <SelectCount onChange={handleChange} id={e.name} name={e.price}>
                  <option defaultValue="1">1</option> 
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </SelectCount> 
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
      <Total currencyCode={currencyCode} totalPr={totalPr} />
    </>
  );
}
export default AddMenu;