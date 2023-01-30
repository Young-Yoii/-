import React from 'react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { oneColor, changeColor, gradient, getImage } from '../store/BackgroundSlice';
import { OptionWrapper, OptionTitle, Button, ColorPicker, ColorWrapper } from './Styled';

const ChangeBackground = () => {
  const [selectBtnId, setSelectBtnId] = useState<string>('2');
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.background);

  const ref = useRef<any>();

  const ALLOW_FILE_EXTENSION = 'jpg,jpge,png';
  const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;

  const randomRGB = () => {
    let rgb = '';
    rgb += (Math.floor(Math.random() * 90 + 1) + 150).toString(16).padStart(2, '0');
    rgb += (Math.floor(Math.random() * 90 + 1) + 150).toString(16).padStart(2, '0');
    rgb += (Math.floor(Math.random() * 90 + 1) + 150).toString(16).padStart(2, '0');
    return rgb;
  };

  const btnClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = (e.target as HTMLButtonElement)?.id;
    setSelectBtnId(id);
  };

  const gradientBackground = () => {
    const rgb = randomRGB();
    dispatch(gradient(rgb));
  };

  const colorBackground = () => {
    dispatch(oneColor(state.color));
  };

  const imageBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target;
    const file = (image.files as FileList)?.[0];

    if (image.value.length === 0 && state.isImg === false) {
      setSelectBtnId('2');
    }
    if (!fileExtensionValid(file)) {
      image.value = '';
      alert(`업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`);
      return;
    }
    if (file.size > FILE_SIZE_MAX_LIMIT) {
      image.value = '';
      alert('업로드 가능한 최대 용량은 5MB입니다. ');
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e) => {
      const result = e?.target?.result as string;
      dispatch(getImage(result));
    };
  };

  const fileExtensionValid = (file: File): boolean => {
    const lastIndex = file.name.lastIndexOf('.');
    if (lastIndex < 0) return false;
    const extension = file.name.substring(lastIndex + 1).toLowerCase();
    if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') return false;
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
          onChange={(e) => {
            dispatch(changeColor(e.target.value));
          }}
        />
      </ColorWrapper>
      <Button
        id="1"
        className={'1' === selectBtnId ? 'clicked' : ''}
        onClick={(e) => {
          gradientBackground();
          btnClicked(e);
        }}
      >
        랜덤 그라디언트
      </Button>
      <Button
        id="2"
        className={'2' === selectBtnId ? 'clicked' : ''}
        onClick={(e) => {
          colorBackground();
          btnClicked(e);
        }}
      >
        단색
      </Button>
      <input type="file" accept="image/jpg, image/png, image/jpeg" ref={ref} onChange={(e) => imageBackground(e)} style={{ display: 'none' }} />
      <Button
        id="3"
        className={'3' === selectBtnId ? 'clicked' : ''}
        onClick={(e) => {
          ref.current?.click();
          btnClicked(e);
        }}
      >
        이미지
      </Button>
    </OptionWrapper>
  );
};

export default ChangeBackground;
