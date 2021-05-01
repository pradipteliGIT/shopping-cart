import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddle from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleWare = createSagaMiddle();

// Added middleWares
export const middleWares = [logger, sagaMiddleWare, thunk];

// Creating store by using all the reducers(rootReducer object contains all the reducers)
const store = createStore(rootReducer, applyMiddleware(...middleWares));
sagaMiddleWare.run(rootSaga);
export default store;
