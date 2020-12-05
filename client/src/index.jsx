
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainView from './components/main-view/main-view';
import filmsApp from './reducers/reducers';
// import { LoginView } from './components/login-view/login-view';
// import { RegistrationView } from './components/registration-view/registration-view';

//import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(filmsApp);

//main component
class FataleFlixApp extends React.Component {
   render() {
      return (
         <Provider store={store}>
            <MainView />
         </Provider>);
   }
}

//finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//tells react to render your app in the root DOM element
ReactDOM.render(React.createElement(FataleFlixApp), container);
