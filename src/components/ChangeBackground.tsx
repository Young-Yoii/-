import React from "react";
import { useRef, useState, useReducer} from "react";
import styled, {css} from 'styled-components';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
// import { useBgDispatch, useBgState } from "../store/BackgroundSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from "../store/Store";
import { oneColor, changeColor, gradient, getImage  } from "../store/BackgroundSlice";
import { OptionWrapper, OptionTitle, Button} from "./Styled";


const Container = styled.div`
  margin: 0 auto;
`
const ThumnailWrap = styled.div<{color: string, rgb:string, img:string, isImg:boolean}>`
  width: 768px;
  height: 402px;
  margin: 0 auto;
  background: ${
    props=>props.rgb !=='' 
    ? `linear-gradient(to bottom, #${props.color}, #${props.rgb})`
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




const ChangeBackground = () => {
  const dispatch = useDispatch();
  const state = useSelector((state:RootState)=>state.background);
    
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

  const gradientBackground = () => {
    const rgb = randomRGB();
    dispatch(gradient(rgb));
  }
    
  const colorBackground = () => {
    dispatch(oneColor(state.color));
  }
    
  const imageBackground = (e:React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target;
    const file = (image.files as FileList)?.[0];
    
    if(!fileExtensionValid(file)){
      image.value = '';
      alert(`업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`)
      return;
    };
    if(file.size > FILE_SIZE_MAX_LIMIT){
      image.value = '';
      alert('업로드 가능한 최대 용량은 5MB입니다. ')
      return;
    };
    
    const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
      const result = e?.target?.result as string;
        dispatch(getImage(result));
      }
    };
    
    const fileExtensionValid = (file:File):boolean => {
      const lastIndex = file.name.lastIndexOf('.');
      if(lastIndex < 0) return false;
      const extension = file.name.substring(lastIndex+1).toLowerCase();
      if(!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') return false;
      return true;
    };

    return (
    <OptionWrapper>
      <OptionTitle>배경 선택</OptionTitle>
      <label htmlFor="chooseColor">색상</label>
      <ColorPicker 
        type="color" 
        id="chooseColor" 
        value={state.color} 
        onChange={(e) => {dispatch(changeColor(e.target.value))}}
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
  )
};

export default ChangeBackground;