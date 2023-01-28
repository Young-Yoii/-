import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import styled, {css} from 'styled-components';
import { Input } from './Styled';
import { resetBg } from "../store/BackgroundSlice";
import { resetLayout } from '../store/LayoutSlice';
import { resetTextStyle } from '../store/TextStyleSlice';

const ThumnailWrap = styled.div<{color: string, rgb:string, img:string, isImg:boolean}>`
  width: 768px;
  height: 402px;
  margin: 40px 0px 0px 0px;
  background: ${
    props=>props.rgb !=='' 
    ? `linear-gradient(to bottom, ${props.color}, #${props.rgb})`
    : props.color 
  };

  ${props=>props.isImg && css`
  background: url('${props.img}') no-repeat center;
  background-size: cover;
  `}

`;
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
const InputWrap = styled.div`
  text-align: center;
`
const CompleteBtn = styled.button<{reset:boolean}>`
  background-color:#e9e9e9;
  border-radius: 8px;
  border: none;
  width: 200px;
  height: 40px;
  margin: 60px 40px 20px 40px;
  box-shadow: 1px 2px 4px #484646;
  font-size: 15px;
  font-weight: 600;

  ${props=>props.reset && css`
    background-color: #9f9f9f;
  `}
`

type State = {
  title: string,
  subTitle: string,
  description: string
};


const Thumnail = () => {
  const [inputs, setInputs] = useState<State>({
    title: '제목을 입력하세요',
    subTitle: '부제목을 입력하세요',
    description: '설명',
  });
  const ref = useRef<any>();
  const dispatch = useDispatch();

  const backgroundState = useSelector((state:RootState)=>state.background);
  const layoutState = useSelector((state:RootState)=>state.layout);
  const textStyleState = useSelector((state:RootState)=>state.textStyle);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value,
    })
  };
  const onDownloadBtn = () => {
    domtoimage
      .toBlob(ref.current)
      .then((blob) => {
      saveAs(blob, 'thumnail.png');
    });
  };

  return (
    <div>
    <h1>썸네일 메이커</h1>
      <ThumnailWrap
        color={backgroundState.color}
        rgb={backgroundState.rgb}
        img={backgroundState.img}
        isImg={backgroundState.isImg}
        ref={ref}
      >
      <TextWrap
        showAllText={layoutState.showAllText}
        hideDescription={layoutState.hideDescription}
        showOnlyTitle={layoutState.showOnlyTitle}
        color={textStyleState.color}
        shadow={textStyleState.shadow}
      >
        <Title size={textStyleState.titleSize}>{inputs.title}</Title>
        <SubTitle size={textStyleState.subTitleSize}>{inputs.subTitle}</SubTitle>
        <Description size={textStyleState.descriptionSize}>{inputs.description}</Description>
      </TextWrap>
      </ThumnailWrap>
      <InputWrap>
        <Input name='title'  value={inputs.title} onChange={onChange}/>
        <Input name='subTitle' value={inputs.subTitle} onChange={onChange}/>
        <Input name='description' value={inputs.description} onChange={onChange}/>
        <div>
          <CompleteBtn
            reset
            onClick={() => {
              dispatch(resetBg())
              dispatch(resetLayout())
              dispatch(resetTextStyle())
              setInputs({
                title: '제목을 입력하세요',
                subTitle: '부제목을 입력하세요',
                description: '설명',
              })
            }}>초기화</CompleteBtn>
          <CompleteBtn
            reset={false}
            onClick={onDownloadBtn}
            >다운로드</CompleteBtn>
        </div>
      </InputWrap>
      </div>
    )
};

export default Thumnail;