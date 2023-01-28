import styled, {css} from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store';
import Thumnail from "./Thumnail";
import ChangeBackground from "./ChangeBackground";
import ChangeLayout from "./ChangeLayout";
import ChangeTextStyle from "./ChangeTextStyle";

const Background = styled.div<{color: string, rgb:string, img:string, isImg:boolean}>`
  width: 100%;
  height: 950px;
  position: absolute;
  left: 0;
  top: 0;
  background: ${
    props=>props.rgb !=='' 
    ? `linear-gradient(to bottom, ${props.color}, #${props.rgb})`
    : props.color 
  };

  ${props=>props.isImg && css`
  background: url('${props.img}') no-repeat center;
  background-size: cover;
  `}
  &::after {
    backdrop-filter: blur(10px);
    content: "";
    height: 800px;
    position: absolute;
    width: 100%;
  }
`
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  filter: none;
  background: #fff;
  position: relative;
  width: 1300px;
  height: 750px;
  margin: 5% auto;
  padding: 30px 0px;
  box-shadow: 0 0 20px #aaa;
  box-sizing:border-box;
`
const OptionContainer = styled.div`
  margin-left: 50px;
`

const Layout = () => {
  const backgroundState = useSelector((state:RootState)=>state.background);
  return (
    <>
    <Background 
      color={backgroundState.color}
      rgb={backgroundState.rgb}
      img={backgroundState.img}
      isImg={backgroundState.isImg}
    />
    <Container>
      <Thumnail/>
      <OptionContainer>
        <ChangeBackground />
        <ChangeLayout/>
        <ChangeTextStyle/>
      </OptionContainer>
    </Container>
    </>
  )
}

export default Layout;