import { connectRouter, routerMiddleware } from 'connected-react-router';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import encryptor from './reducer/encryptor';

import reducers from './reducer';

const createReducers = (history) => combineReducers({
  router: connectRouter(history),
  ...reducers,
});

const persistConfig = {
  key: 'vox_neol',
  transforms: [encryptor],
  blacklist: ['isLoading', 'temp'],
  storage
};

export default (history) => {
  const rootReducer = createReducers(history);

  const persistedReducer = persistReducer(persistConfig, rootReducer);
 
  const store = configureStore({
    middleware: [routerMiddleware(history), thunk],
    reducer: persistedReducer,
  });

  const persistor = persistStore(store);

  return { store, persistor };
};
