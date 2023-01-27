import { OptionWrapper, OptionTitle, Button } from "./Styled"
import { useDispatch } from "react-redux"
import {showAllText, hideDescription, showOnlyTitle} from "../store/LayoutSlice";

const ChangeLayout = () => {
  const dispatch = useDispatch();
  return (
    <OptionWrapper>
      <OptionTitle>썸네일 구성요소</OptionTitle>
      <Button 
        name='title' 
        onClick={()=> 
        dispatch(showAllText())}>
          제목 + 부제목 + 설명
      </Button>
      <Button 
        name='subTitle' 
        onClick={()=> 
        dispatch(hideDescription())}>
          제목 + 부제목
      </Button>
      <Button 
        name='description' 
        onClick={()=> 
        dispatch(showOnlyTitle())}>
          제목
      </Button>
    </OptionWrapper>
    )
}

export default ChangeLayout;