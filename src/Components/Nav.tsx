import styled from 'styled-components';

const NavComponent = styled.div`
  height: 70px;
  width: 100%;
  background-color: #7e57c2;
  display: flex;
  align-items: center;
`;
const Logo = styled.p`
  font-size: 20px;
  color: #ffffff;
  margin-left: 30px;
  cursor: pointer;
`;
const Nav = () => {
  return (
    <>
      <NavComponent>
        <Logo>COLAVO</Logo>
      </NavComponent>
    </>
  )
}
export default Nav;