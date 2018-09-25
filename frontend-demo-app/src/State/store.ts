import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";
import { rootReducer } from "./reducers";

//const isDevEnv = process.env.NODE_ENV === "development";
const isDevEnv = true;
const epicMiddleware = createEpicMiddleware(rootEpic);

function _getMiddleware() {
  let middleware = [epicMiddleware];

  if (isDevEnv) {
    middleware = [...middleware];
  }

  return applyMiddleware(...middleware);
}

function _getEnhancers() {
  let enhancers = [];

  if (isDevEnv && window.devToolsExtension) {
    enhancers = [...enhancers, window.devToolsExtension()];
  }

  return enhancers;
}

function _enableHotLoader(store) {
  if (isDevEnv) {
    (module as any).hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers/index").rootReducer;
      store.replaceReducer(nextRootReducer);
    });
    (module as any).hot.accept("./epics", () => {
      const rootEpic = require("./epics/index").rootEpic;
      store.replaceEpic(rootEpic);
    });
  }
}

export const configureStore = (initialState: any) => {
  const store = compose(_getMiddleware(), ..._getEnhancers())(createStore)(
    rootReducer,
    initialState
  );

  _enableHotLoader(store);
  return store;
};
