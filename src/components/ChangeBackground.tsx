import React from "react";
import { useRef} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/Store";
import { oneColor, changeColor, gradient, getImage  } from "../store/BackgroundSlice";
import { OptionWrapper, OptionTitle, Button, ColorPicker, ColorWrapper } from "./Styled";



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
      <ColorWrapper>
        <label htmlFor="chooseColor">색상</label>
        <ColorPicker 
          type="color" 
          id="chooseColor" 
          value={state.color} 
          onChange={(e) => {dispatch(changeColor(e.target.value))}}
            />
        </ColorWrapper>
      <Button onClick={gradientBackground}>그라디언트</Button>
      <Button onClick={colorBackground}>단색</Button>
      <input 
        type="file" 
        accept="image/jpg, image/png, image/jpeg" 
        ref={ref}
        onChange={(e) => imageBackground(e)}
        style={{display: "none"}}
      />
      <Button onClick={() => ref.current?.click()}>이미지</Button>
    </OptionWrapper>
  )
};

export default ChangeBackground;