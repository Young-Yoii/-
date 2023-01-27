import GlobalStyle from './GlobalStyle';
import Layout from './components/Layout';
// import { BgProvider } from './store/BackgroundSlice';
import  store  from './store/Store';
import { Provider } from "react-redux";

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
