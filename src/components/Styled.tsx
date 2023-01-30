import styled, { css } from "styled-components";

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #e9e9e9;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 250px;
  box-sizing: border-box;
`;
export const OptionTitle = styled.span`
  font-weight: 600;
  border-bottom: 1px solid #000000;
  margin-bottom: 8px;
`;
export const Button = styled.button`
  background-color:#fff;
  border-radius: 8px;
  border: none;
  width: 200px;
  height: 32px;
  margin: 8px 0px;
  box-shadow: 1px 2px 4px #484646;

  &.clicked {
    background: #ed6c30;
    color: #ffffff;
  };

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
export const ColorWrapper = styled.div`
  display: flex;
  align-items: center;
`
export const Input = styled.input`
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid #484646;
  padding: 0px 10px;
  box-sizing: border-box;
  width: 220px;
  height: 32px;
  margin-right: 20px;
`;
export const TextSizeInput = styled.input`
  background-color:#fff;
  border-radius: 8px;
  border: none;
  width: 200px;
  height: 27px;
  margin: 3px 0px;
  box-shadow: 1px 2px 4px #484646;
  text-align: center;
  border: 1px solid gray;
`