import { legacy_createStore, applyMiddleware } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunk from "redux-thunk";
import reducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["bookmarkedUsers"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
