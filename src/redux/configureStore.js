import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import sagas from "../sagas";
import logger from "redux-logger";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = applyMiddleware(sagaMiddleware, logger);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(enhancer));

  sagaMiddleware.run(sagas);

  return store;
}
