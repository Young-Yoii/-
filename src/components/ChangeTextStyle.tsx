import { OptionWrapper, OptionTitle, Button, ColorPicker } from "./Styled"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/Store";
import { changeColor, setShadow, setFontColor } from "../store/TextStyleSlice";

const ChangeTextStyle = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.textStyle);

  return (
    <OptionWrapper>
      <OptionTitle>글자 꾸미기</OptionTitle>
      <label htmlFor="fontColor">색상</label>
      <ColorPicker 
        type="color"
        id="fontColor" 
        value={state.color} 
        onChange={(e) => {
        dispatch(changeColor(e.target.value))
        dispatch(setFontColor(e.target.value))
        }}/>
      <Button onClick={()=> 
        {dispatch(setShadow())
      }}>그림자
      </Button>
    </OptionWrapper>
    )
}

export default ChangeTextStyle;