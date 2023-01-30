import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import Thumbnail from '../components/Thumbnail';
import ChangeBackground from '../components/ChangeBackground';
import ChangeLayout from '../components/ChangeLayout';
import ChangeTextStyle from '../components/ChangeTextStyle';

const Background = styled.div<{ bgcolor: string; rgb: string; img: string; isImg: boolean }>`
  width: 100%;
  height: 100%;
  min-height: 900px;
  position: absolute;
  left: 0;
  top: 0;
  background: ${(props) => (props.rgb !== '' ? `linear-gradient(to bottom, ${props.bgcolor}, #${props.rgb})` : props.bgcolor)};
  ${(props) =>
    props.isImg &&
    css`
      background: url('${props.img}') no-repeat center;
      background-size: cover;
    `}
  &::after {
    backdrop-filter: blur(10px);
    content: '';
    height: 100%;
    position: absolute;
    width: 100%;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  filter: none;
  background: #fff;
  position: relative;
  min-width: 1300px;
  width: 1300px;
  height: 800px;
  // padding: 30px 0px;
  box-shadow: 0 0 20px #aaa;
  box-sizing: border-box;
  margin: 3% auto 0;
`;
const OptionContainer = styled.div`
  margin-left: 50px;
`;

const ThumbnailMaker = () => {
  const backgroundState = useSelector((state: RootState) => state.background);
  return (
    <>
      <Background bgcolor={backgroundState.color} rgb={backgroundState.rgb} img={backgroundState.img} isImg={backgroundState.isImg} />
      <Container>
        <Thumbnail />
        <OptionContainer>
          <ChangeBackground />
          <ChangeLayout />
          <ChangeTextStyle />
        </OptionContainer>
      </Container>
    </>
  );
};

export default ThumbnailMaker;
