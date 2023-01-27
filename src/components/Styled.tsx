import styled from "styled-components";

export const OptionWrapper = styled.div`
  border-bottom: 2px solid #000;
  padding-bottom: 20px;
`;
export const OptionTitle = styled.span`
  font-weight: 600;
`;
export const Button = styled.button`
  background-color:#fff;
  border-radius: 20px;
  border: 1px solid #000;
  width: 150px;
  height: 30px;
  margin-right: 20px;
`
export const ColorPicker = styled.input`
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