import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save, load } from 'redux-localstorage-simple';

import contactReducer from './contactReducers';

const rootReducer = combineReducers({
  contacts: contactReducer,
});

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(save()))(
  createStore,
);

export const store = createStoreWithMiddleware(rootReducer, load());
