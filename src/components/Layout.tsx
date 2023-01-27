import React from "react";
import { useRef, useState, useReducer} from "react";
import styled, {css} from 'styled-components';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from "../store/Store";
import ChangeBackground from "./ChangeBackground";
import ChangeLayout from "./ChangeLayout";
import ChangeTextStyle from "./ChangeTextStyle";

const Container = styled.div`
  margin: 0 auto;
`
const ThumnailWrap = styled.div<{color: string, rgb:string, img:string, isImg:boolean}>`
  width: 768px;
  height: 402px;
  margin: 0 auto;
  background: ${
    props=>props.rgb !=='' 
    ? `linear-gradient(to bottom, ${props.color}, #${props.rgb})`
    : props.color 
  };

  ${props=>props.isImg && css`
  background: url('${props.img}')
  `}

`;
const Input = styled.input`
  margin-top: 20px;
  border-radius: 20px;
  border: 1px solid #000;
  padding: 0px 10px;
  box-sizing: border-box;
  width: 200px;
  height: 30px;
  margin-right: 20px;
`;
const Button = styled.button`
  background-color:#fff;
  border-radius: 20px;
  border: 1px solid #000;
  width: 150px;
  height: 30px;
  margin-right: 20px;
`
const TextWrap = styled.div
<{showAllText:boolean, hideDescription:boolean, showOnlyTitle:boolean, color:string, shadow:boolean}>`
  
  position: relative;
  width: 768px;
  height: 402px;
  text-align: center;

  > h1, h2, p {
    position: relative;
    color: ${props => props.color};
    ${props => props.shadow && css`
    text-shadow: 2px 2px 2px #828282;
    `}
  };

  ${props => props.showAllText && css`
    > h1 {top: 140px};
    > h2 {top: 150px};
    > p {top:220px};
  `}
  ${props => props.hideDescription && css`
    > h1 {top: 150px};
    > h2 {top: 160px};
    > p {display:none};
  `}
  ${props => props.showOnlyTitle && css`
    > h1 {top: 170px};
    > h2 {display:none};
    > p {display:none};
  `}
`
const Title = styled.h1<{size:number}>`
  font-size: ${props => props.size}px;
`
const SubTitle = styled.h2<{size:number}>`
  font-size: ${props => props.size}px;
`
const Description = styled.p<{size:number}>`
  font-size: ${props => props.size}px;
`

type State = {
  title: string,
  subTitle: string,
  description: string
};

const Layout = () => {
  const [inputs, setInputs] = useState<State>({
      title: '제목을 입력하세요',
      subTitle: '부제목을 입력하세요',
      description: '설명',
  });

  const ref = useRef<any>([]);
  const backgroundState = useSelector((state:RootState)=>state.background);
  const layoutState = useSelector((state:RootState)=>state.layout);
  const textStyleState = useSelector((state:RootState)=>state.textStyle);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value,
    })
  }

  const onDownloadBtn = () => {
    domtoimage
      .toBlob(ref.current[0])
      .then((blob) => {
      saveAs(blob, 'thumnail.png');
  });
};

  return (
    <Container>
      <h1>썸네일 메이커</h1>
      <ThumnailWrap 
        ref={(el) => {ref.current[0] = el}} 
        color={backgroundState.color}
        rgb={backgroundState.rgb}
        img={backgroundState.img}
        isImg={backgroundState.isImg}
        >
        <TextWrap
          showAllText={layoutState.showAllText}
          hideDescription={layoutState.hideDescription}
          showOnlyTitle={layoutState.showOnlyTitle}
          color={textStyleState.color}
          shadow={textStyleState.shadow}
        >
          <Title
            size={textStyleState.titleSize}
          >{inputs.title}</Title>
          <SubTitle
            size={textStyleState.subTitleSize}
          >{inputs.subTitle}</SubTitle>
          <Description
            size={textStyleState.descriptionSize}
          >{inputs.description}</Description>
        </TextWrap>
      </ThumnailWrap>
      <div>
        <Input name='title'  value={inputs.title} onChange={onChange}/>
        <Input name='subTitle' value={inputs.subTitle} onChange={onChange}/>
        <Input name='description' value={inputs.description} onChange={onChange}/>
      </div>
      <ChangeBackground />
      <ChangeLayout/>
      <ChangeTextStyle/>
      <Button onClick={onDownloadBtn}>다운로드</Button>
    </Container>
  )
}

export default Layout;