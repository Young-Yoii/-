import GlobalStyle from './GlobalStyle';
import ThumnailMaker from './page/ThumnailMaker';
import store from './store/Store';
import { Provider } from 'react-redux';
import './App.css';

function App() {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ThumnailMaker />
      </Provider>
    </>
  );
}

export default App;
