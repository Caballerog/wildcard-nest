import { ActionsObservable } from "redux-observable";
import { Action } from "redux";
import "rxjs";
import { LoginActions, logged, loginError, noop } from "../actions";
import { Observable } from "rxjs/Observable";

export const loginEpic = (action$: ActionsObservable<Action>) =>
  action$.ofType(LoginActions.login).switchMap(action =>
    Observable.fromPromise(window.login(action.payload))
      .mapTo(logged())
      .catch(error => Observable.of(loginError(getErrorString(error))))
  );

export const logoutEpic = (action$: ActionsObservable<Action>) =>
  action$.ofType(LoginActions.logout).switchMap(() =>
    Observable.fromPromise(window.logout())
      .mapTo(noop())
      .catch(error => Observable.of(loginError(getErrorString(error))))
  );

export const registerEpic = (action$: ActionsObservable<Action>) =>
  action$.ofType(LoginActions.register).switchMap(action =>
    Observable.fromPromise(window.register(action.payload))
      .mapTo(noop())
      .catch(error => Observable.of(loginError(getErrorString(error))))
  );

function getErrorString(error) {
  if (error && error.message) return error.message;
  if (error && typeof error == "string" && error !== "") return error;
  return "unknown error";
}
