import { OptionWrapper, OptionTitle, Button, ColorPicker, ColorWrapper, TextSizeInput } from './Styled';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../store/Store';
import { changeColor, setShadow, setFontColor, setTitleSize, setSubTitleSize, setDescriptionSize } from '../store/TextStyleSlice';

const ChangeTextStyle = () => {
  const [selectBtn, setSelectBtn] = useState<boolean>(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.textStyle);

  return (
    <OptionWrapper>
      <OptionTitle>글자 꾸미기</OptionTitle>
      <ColorWrapper>
        <label htmlFor="fontColor">색상</label>
        <ColorPicker
          type="color"
          id="fontColor"
          value={state.color}
          onChange={(e) => {
            dispatch(changeColor(e.target.value));
            dispatch(setFontColor(e.target.value));
          }}
        />
      </ColorWrapper>
      <Button
        className={selectBtn ? 'clicked' : ''}
        onClick={() => {
          dispatch(setShadow());
          setSelectBtn((prev: boolean) => !prev);
        }}
      >
        그림자
      </Button>
      <TextSizeInput type="text" placeholder="제목 글자 크기" onChange={(e) => dispatch(setTitleSize(Number(e.target.value)))} />
      <TextSizeInput type="text" placeholder="부제목 글자 크기" onChange={(e) => dispatch(setSubTitleSize(Number(e.target.value)))} />
      <TextSizeInput type="text" placeholder="설명 글자 크기" onChange={(e) => dispatch(setDescriptionSize(Number(e.target.value)))} />
    </OptionWrapper>
  );
};

export default ChangeTextStyle;
