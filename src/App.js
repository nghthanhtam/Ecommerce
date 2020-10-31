import React, { Component } from 'react';
import { Provider } from 'react-redux';

import CoffeShop from './CoffeShop';
import { loadHistory } from './state/actions/historyActions';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import rootSaga from './state/sagas';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import rootReduce from './state/reducers';

//import store from "./store";
const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReduce, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

class App extends Component {
  state = {};
  componentDidMount() {
    store.dispatch(loadHistory(history));
    console.log(process.env.REACT_APP_BACKEND_HOST);
  }

  render() {
    return (
      <Router history={history}>
        <Provider store={store}>
          <CoffeShop />
        </Provider>
      </Router>
    );
  }
}

export default App;
