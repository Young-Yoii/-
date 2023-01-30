import { OptionWrapper, OptionTitle, Button } from "./Styled"
import { useDispatch } from "react-redux"
import { useState } from "react"
import {showAllText, hideDescription, showOnlyTitle} from "../store/LayoutSlice";

const ChangeLayout = () => {
  const [selectBtnId, setSelectBtnId] = useState<string>('1');
  const dispatch = useDispatch();

  const btnClicked = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = (e.target as HTMLButtonElement)?.id;
    setSelectBtnId(id);
  };

  return (
    <OptionWrapper>
      <OptionTitle>썸네일 구성요소</OptionTitle>
      <Button 
        id='1'
        className={'1' === selectBtnId ? 'clicked' : ''}
        name='title' 
        onClick={(e)=> {
        dispatch(showAllText())
        btnClicked(e)
        }}>
          제목 + 부제목 + 설명
      </Button>
      <Button 
        id='2'
        className={'2' === selectBtnId ? 'clicked' : ''}
        name='subTitle' 
        onClick={(e)=> {
        dispatch(hideDescription())
        btnClicked(e)
        }}>
          제목 + 부제목
      </Button>
      <Button
        id='3'
        className={'3' === selectBtnId ? 'clicked' : ''}
        name='description' 
        onClick={(e)=> {
        dispatch(showOnlyTitle())
        btnClicked(e)
        }}>
          제목
      </Button>
    </OptionWrapper>
    )
}

export default ChangeLayout;