import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";
import { Provider } from "react-redux";
import { configureStore } from "./State/store";
import {
  createUser,
  deleteUser,
  updateUser,
  createTweet,
  updateTweet,
  deleteTweet,
  notify,
  loginError
} from "./State/actions";
import FeathersJS from "./server-implementations/FeathersJS";
import NestJS from "./server-implementations/NestJS";

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/*
 * |- - - - - - - - - - - - - -|
 * |                           |
 * |                           |
 * |                           |
 * |   Set Global Interface    |
 * |- - - - - - - - - - - - - -|
 */

window._createUser = (user: User) => store.dispatch(createUser(user));
window._updateUser = (user: User) => store.dispatch(updateUser(user));
window._deleteUser = (user: User) => store.dispatch(deleteUser(user));

window._createTweet = (tweet: Tweet) => store.dispatch(createTweet(tweet));
window._updateTweet = (tweet: Tweet) => store.dispatch(updateTweet(tweet));
window._deleteTweet = (tweet: Tweet) => store.dispatch(deleteTweet(tweet));

window.login = async () => {
  throw "not implemented";
};
window.logout = async () => {
  throw "not implemented";
};
window.register = async () => {
  throw "not implemented";
};

window.notify = (message: string) => store.dispatch(notify(message));
window.error = (message: string) => store.dispatch(loginError(message));

window.NestJS = NestJS;
window.FeathersJS = FeathersJS;
