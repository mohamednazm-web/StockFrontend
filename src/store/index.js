import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import thunk from "redux-thunk"

import rootReducer from "./reducers"
import rootSaga from "./sagas"

const saga = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleWares = [saga, thunk]
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWares))
)
saga.run(rootSaga)

export default store
