import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0; 
    padding: 0;
  };
  body {
    font-family: 'Noto Sans KR', sans-serif;
  };
  button {
    font-family: 'Noto Sans KR', sans-serif;
  };
`;

export default GlobalStyle;
