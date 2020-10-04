import React, { Component } from "react";
import { Provider } from "react-redux";

import CoffeShop from "./CoffeShop";
import { loadHistory } from "./actions/historyActions";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import rootSaga from "./sagas";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import rootReduce from "./reducers";

//import store from "./store";
const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReduce, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

class App extends Component {
  state = {};
  componentDidMount() {
    store.dispatch(loadHistory(history));
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
