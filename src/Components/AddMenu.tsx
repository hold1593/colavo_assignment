import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Total from '../Components/Total';
import styled from 'styled-components';
import '../my_custom.css';

const ButtonSection = styled.section`
  display: flex;
`;
const EditButton = styled(Button)`
  margin: 0;
`;
const MenuList = styled.div`
  height: 400px;
  width: 400px;
  overflow-y: auto;
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
const SalePrice = styled.p`
  font-size: 13px;
  color: #e91e63;
`;
const ModalUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  overflow-y: auto;
`;
const ModalLi = styled.li`
  margin-bottom: 15px;
  `;
const ModalInput = styled.input`
  margin-right: 15px;
  cursor: pointer;
`;
const SelectCount = styled.select`
  width: 70px;
  height: 30px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 2px;
  padding: 5px;
  
  &:hover{
    cursor: pointer;
    border: 1px solid #d0b0ff;
  }
`;
const NoteP = styled.p`
  font-size: 12px;
  text-align: center;
  color: #9e9e9e;
`;
const NoteP_2 = styled(NoteP)`
  font-size: 15px;
`;
const NoteP_3 = styled(NoteP)`
  text-align: left;
`;

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
  const [editModal, setEditModal] = useState(false);
  const [oriPr, setOriPr] = useState(0);
  const [arr, setArr] = useState<myProps['arr']>([]);
  const [disArr, setDisArr] = useState<myProps['arr']>([]);
  const [filterArr, setFilterArr] = useState<myProps['arr']>([]);
  const [sta,setSta] = useState(true);
  let data: {name:string, price:number, count: number, state: boolean} = {
    name: '',
    price: 0,
    count : 1,
    state: true,
  }
  let disData: {name:string, rate:number, price:number} = {
    name: '',
    rate: 0,
    price: 0,
  }
  let dumy: any[] = [...arr];
  let money: number = 0;
  let sale: number = 0;
  let accSale : number = 0;
  let dumyDis: any[] = [...disArr];

  // 시술 모달 열기 함수
  const showSurgeryModal = () => {
    setSurgeryModal(true);
  };
  // 시술 모달 취소(닫기)함수
  const handleCancelSurgery = () => {
    setSurgeryModal(false);
  };
  // 할인 모달 열기 함수
  const showDiscountModal = () => {
    setDiscountModal(true);
  };
  // 할인 모달 취소(닫기)함수
  const handleCancelDiscount = () => {
    setDiscountModal(false);
  };
  // 수정버튼 모달 오픈 함수
  const handleOpenEdit = (e:any) => {
    //console.log('e:::',e)
    setEditModal(true);
  };
  // 수정버튼 취소 함수
  const handleCancelEdit = () => {
    setEditModal(false);
  };
  // 메뉴리스트의 시술 셀렉트 변경 이벤트 함수
  const handleChange = (e:any) => {
    let newArr = [...arr];
    data = {
      name : e.target.id,
      price : parseInt(e.target.name),
      count : parseInt(e.target.value),
      state: true,
    }

    for(let i=0; i<newArr.length; i++){
      // arr[i]['name']값이 e.target.id랑 일치하면
      if(newArr[i]['name'] === e.target.id){
        // 더미의 arr[i]를 삭제 후 그자리에 data 넣기
        newArr.splice(i,1,data);
      }
      money = money + newArr[i]['price']*newArr[i]['count'];
    }
    // 그리고 더미를 arr에 뒤집어씌우기
    setArr(newArr);
    setOriPr(money);
  }
  // 시술리스트 인풋 클릭시 발생 이벤트 함수
  const handlePickItem = (e:any) => {
    data = {
      name: e.target.id,
      price: parseInt(e.target.name),
      count : parseInt(e.target.classList[2]),
      state : true,
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
  // 할인리스트 인풋 클릭시 발생 이벤트 함수
  const handlePickDiscount = (e:any) => {
    disData = {
      name: e.target.id,
      rate: Number(e.target.name),
      price: 0,
    }
    if(e.target.checked){ // 체크누르면
      dumyDis.push(disData); // newArr에 넣자
    }else{ // 체크해제하면
      for(let i=0; i<dumyDis.length; i++){
        if(dumyDis[i]['name'] === e.target.id){ // newArr에 있는지 확인하구 있다면
          dumyDis.splice(i,1) //없애자
        }
      }
    };
  }
  // 할인수정의 인풋체크박스 클릭시 발생 이벤트 함수
  const handleEdit = (e:any) => {
  
    data = {
      name: e.target.name,
      price : e.target.id,
      count : e.target.value,
      state : e.target.checked,
    }

    for(let i=0; i < dumy.length; i++){
      if(dumy[i]['name'] === data['name']){
        dumy[i]['state'] = data['state'];
      }
    }
    for(let i=0; i < dumy.length; i++) {
      if(dumy[i]['state'] === false){
        dumy.splice(i,1);
      }
    }
  }
   // 수정 확인버튼 이벤트 함수
   const handleOkEdit = () => {
    //alert('서비스 준비중 입니다.')
    setFilterArr(dumy);
    setEditModal(false);
  }
  // 시술모달 확인버튼 함수
  const handleOkSurgery = () => {
    setArr(dumy);
    for(let i=0; i<dumy.length; i++) {
      money = money + dumy[i]['price'];
    }
    setOriPr(money);
    setSurgeryModal(false);
  };
  // 할인모달 확인버튼 함수
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
        <Button type="primary" onClick={showSurgeryModal}>
          시술 선택 / 해제
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
                </ModalLi>
              )
            })
          }   
          </ModalUl>
        </Modal>
        <Button type="default" onClick={showDiscountModal}>
          할인 선택 / 해제
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
          <NoteP_2>선택된 시술이 없습니다.</NoteP_2>
        }
        {
          disArr.length > 0 ?
            disArr.map((e, idx) => {
              sale = 0;
              return(
                <MenuBox key={idx}>
                  <MenuName>
                    <ItemName>[{e.name}] {Math.floor(e.rate*100)}%</ItemName>
                    <NoteP_3>
                      {
                        arr.map((el,idx,arr) => {
                        return(
                          <>{el.name} </>
                        )
                      })}
                    </NoteP_3>
                    <SalePrice>{
                      arr.map((el) => {sale = sale +(el.price * el.count)*e.rate})}
                      -{priceToString(Math.floor(sale))}원
                    </SalePrice>
                  <p style={{'display':'none'}}>{accSale += sale}</p>
                  </MenuName>
                  <EditButton type="primary" icon={<EditOutlined />} onClick={handleOpenEdit}>수정</EditButton>
                </MenuBox>
                )
              })
              :
              <></>
            }
          <Modal title="할인 메뉴 수정" visible={editModal} onOk={handleOkEdit} onCancel={handleCancelEdit}>
            <ModalUl>
            {
              arr.map((e,idx) => {
                return (
                  <ModalLi key={idx}>
                    <ModalInput type="checkbox" value={e.count} id={e.price} name={e.name} onClick={handleEdit}/>
                    <label htmlFor={e.name}>{e.name}{e.count > 1 ? ` x `+ e.count : null}</label>
                    <p>{priceToString(e.price*e.count)}원</p>
                  </ModalLi>
                )
              })
            }
          </ModalUl>
        </Modal>
      </MenuList>
      <hr style={{ width: 500 }}/>
      <Total currencyCode={currencyCode} disTotal={accSale} oriPr={oriPr}/>
    </>
  );
}
export default AddMenu;