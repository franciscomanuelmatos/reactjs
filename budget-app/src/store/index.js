import { createStore } from 'redux';

import appReducer from '../reducers/index';

export default () => createStore(
  appReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
