import GlobalStyle from './GlobalStyle';
import ThumbnailMaker from './page/ThumbnailMaker';
import store from './store/Store';
import { Provider } from 'react-redux';
import './App.css';

function App() {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ThumbnailMaker />
      </Provider>
    </>
  );
}

export default App;
