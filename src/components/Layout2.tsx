import React from "react";
import { useRef, useState, useReducer } from "react";
import styled from 'styled-components';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const Container = styled.div`
  margin: 0 auto;
`
const ThumnailWrap = styled.div<{color: string, color2:string}>`
  width: 768px;
  height: 402px;
  margin: 0 auto;
  background: ${props=>props.color2 !=='' ? `linear-gradient(to bottom, ${props.color}, #${props.color2})`
    : props.color
}
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
const ColorPicker = styled.input`
  background-color: transparent;
  padding:0;
  appearance: none;
  width:35px;
  height:35px;
  border:none;
  
  &::-webkit-color-swatch {
    border-radius: 5px;
    border:none;
  }
`;
const Button = styled.button`
  background-color:#fff;
  border-radius: 20px;
  border: 1px solid #000;
  width: 150px;
  height: 30px;
  margin-right: 20px;
`
const OptionWrapper = styled.div`
  border-bottom: 2px solid #000;
  padding-bottom: 20px;
`;
const OptionTitle = styled.span`
  font-weight: 600;
`;

type bgState = {
    color: string,
    rgb: string,
    img: string,
};
type bgAction = {type: 'ONE_COLOR'; color: string, rgb: string} | {type: 'GRADIENT'; color: string; rgb: string} | {type: 'IMAGE'; image: string};

function reducer(state: bgState, action: bgAction): bgState {
    console.log(state)
    switch(action.type) {
        case 'ONE_COLOR': return {
            ...state,
            color: action.color,
            rgb: '',
        }
        case 'GRADIENT': return {
            ...state,
            color: action.color,
            rgb: action.rgb
        }
        case 'IMAGE' : return {
            ...state,
            img: action.image}
        default: return state
    }
    
}

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
  const [state, dispatch] = useReducer(reducer, {
    color: 'gray',
    rgb: '',
    img:''
  });

  const [color, setColor] = useState('#dece56');
  const [fontColor, setFontColor] = useState('#000');
  const ref = useRef<any>([]);

  const ALLOW_FILE_EXTENSION = "jpg,jpge,png";
  const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;

  const randomRGB = ()  => {
    let rgb = '';
      rgb += (Math.floor(Math.random() * 90 + 1) + 150)
        .toString(16)
        .padStart(2, '0');
      rgb += (Math.floor(Math.random() * 90 + 1) + 150)
        .toString(16)
        .padStart(2, '0');
      rgb += (Math.floor(Math.random() * 90 + 1) + 150)
        .toString(16)
        .padStart(2, '0');
      return rgb;
    };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value,
    })
  }

  const gradientBackground = () => {
    const rgb = randomRGB();
    dispatch({type:'GRADIENT', color: state.color, rgb: rgb});
//     ref.current[0].style.background = `linear-gradient(to bottom, ${color}, #${rgb})`
  }

  const colorBackground = () => {
    dispatch({type:'ONE_COLOR', color: state.color, rgb:''});
  }

  const imageBackground = (e:React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target;
    const file = (image.files as FileList)?.[0];

    if(!fileExtensionValid(file)){
      image.value = '';
      alert(`업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`)
      return;
    }
    if(file.size > FILE_SIZE_MAX_LIMIT){
      image.value = '';
      alert('업로드 가능한 최대 용량은 5MB입니다. ')
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e) => {
      const result = e?.target?.result as string;
        ref.current[0].style.background = `url('${result}')`
        ref.current[0].style.backgroundSize = 'cover';
        ref.current[0].style.backgroundRepeat = 'no-repeat';
    }
  }

  const fileExtensionValid = (file:File):boolean => {
    const lastIndex = file.name.lastIndexOf('.');
    if(lastIndex < 0) return false;
    const extension = file.name.substring(lastIndex+1).toLowerCase();
    if(!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') return false;
    return true;
  }

  const changeLayout = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
        
    if(name === 'title') {
      [1,2,3].forEach(i => 
        ref.current[i].style.opacity = 1)
    }
    if(name === 'subTitle') {
      ref.current[3].style.opacity = 0;
      ref.current[1].style.opacity = 1;
      ref.current[2].style.opacity = 1;
    }
    if(name === 'description') {
        ref.current[2].style.opacity = 0;
        ref.current[3].style.opacity = 0;
    } 
  };

   const shadowText = () => {
    [1,2,3].forEach(i => {
      ref.current[i].style.textShadow = '2px 2px 2px gray'
    });
  };

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
        color={state.color}
        color2={state.rgb}
        >
        <h1 
          ref={(el) => {ref.current[1] = el}} 
          style={{color: fontColor}}>
            {inputs.title}
        </h1>
        <h2 
          ref={(el) => {ref.current[2] = el}} 
          style={{color: fontColor}}>
            {inputs.subTitle}
        </h2>
        <h3 
          ref={(el) => {ref.current[3] = el}} 
          style={{color: fontColor}}>
            {inputs.description}
        </h3>
      </ThumnailWrap>
      <div>
        <Input name='title'  value={inputs.title} onChange={onChange}/>
        <Input name='subTitle' value={inputs.subTitle} onChange={onChange}/>
        <Input name='description' value={inputs.description} onChange={onChange}/>
      </div>
      <OptionWrapper>
        <OptionTitle>배경 선택</OptionTitle>
        <label htmlFor="chooseColor">색상</label>
        <ColorPicker 
          type="color" 
          id="chooseColor" 
          // value={color} 
          // onChange={(e) => state.color:e.target.value}}
          />
        <Button onClick={gradientBackground}>그라디언트</Button>
        <Button onClick={colorBackground}>단색</Button>
        <input 
            type="file" 
            accept="image/jpg, image/png, image/jpeg" 
            ref={(el) => {ref.current[4] = el}}
            onChange={(e) => imageBackground(e)}
            style={{display: "none"}}
          />
        <Button onClick={() => ref.current[4]?.click()}>이미지</Button>
      </OptionWrapper>
      <OptionWrapper>
        <OptionTitle>썸네일 구성요소</OptionTitle>
          <Button name='title' onClick={changeLayout}>제목 + 부제목 + 설명</Button>
          <Button name='subTitle' onClick={changeLayout}>제목 + 부제목</Button>
          <Button name='description' onClick={changeLayout}>제목</Button>
        </OptionWrapper>
      <OptionWrapper>
        <OptionTitle>글자 꾸미기</OptionTitle>
        <label htmlFor="fontColor">색상</label>
        <ColorPicker 
          type="color"
          id="fontColor" 
          value={fontColor} 
          onChange={(e) => 
            setFontColor(e.target.value)}/>
        <Button onClick={shadowText}>그림자</Button>
      </OptionWrapper>
      <Button onClick={onDownloadBtn}>다운로드</Button>
    </Container>
  )
}

export default Layout;