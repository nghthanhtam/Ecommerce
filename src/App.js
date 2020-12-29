import React, { Component } from "react";
import { Provider } from "react-redux";

import RSeller from "./Routes/RSeller";
import RAdmin from "./Routes/RAdmin";
import RShopNow from "./Routes/RShopNow";
import ErrorPage from "./ErrorPage/ErrorPage";
import NoPermissionPage from "./ErrorPage/NoPermissionPage";
import "react-redux-notify/dist/ReactReduxNotify.css";

import { loadHistory } from "./state/actions/historyActions";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import rootSaga from "./state/sagas";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
import { logger } from "redux-logger";
import rootReduce from "./state/reducers";

//import store from "./store";
const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, logger));

const store = createStore(rootReduce, enhancer);

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
          {/* <CoffeShop /> */}
          <Switch>
            <Route path="/seller" component={RSeller} />
            <Route path="/admin" component={RAdmin} />
            <Route path="/shopnow" component={RShopNow} />
            <Route path="/403" component={NoPermissionPage} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </Provider>
      </Router>
    );
  }
}
export { history };
export default App;
