import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
//import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import rootReduce from './reducers';

const logger = createLogger({
  collapsed: true,
  diff: true,
});

// const middleware = [thunk]

// if (process.env.REACT_APP_ENV !== 'production') {
//   middleware.push(logger)
// }

// const store = createStore(
//   rootReduce,
//   composeWithDevTools(applyMiddleware(...middleware))
// )

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReduce,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(rootSaga);

export default store;
