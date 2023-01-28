import GlobalStyle from './GlobalStyle';
import Layout from './components/Layout';
import  store  from './store/Store';
import { Provider } from "react-redux";
import './App.css';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Provider store={store}>
        <Layout />
      </Provider>
      
    </>
  );
}

export default App;
