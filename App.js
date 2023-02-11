import React from 'react';
import { Root } from "native-base";
import { store } from './src/_helpers/store';
import { Provider } from 'react-redux';
import Routes from './src/Routes/Routes';

const App = () => {
  

  return (

    <Provider store={store}>
      <Root>
        <Routes />
      </Root>
    </Provider>

  );
}

export default App;





