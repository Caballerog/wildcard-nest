import { ActionCreator } from "react-redux";
import { Action } from "redux";

export const enum LoginActions {
  login = "LOGIN",
  logout = "LOGOUT",
  logged = "LOGGED",
  error = "LOGIN_ERROR",
  register = "REGISTER",
  notify = "NOTIFY",
  noop = "NOOP"
}

export const login: ActionCreator<Action> = (info: LoginData) => {
  return {
    type: LoginActions.login,
    payload: info
  };
};

export const loginError: ActionCreator<Action> = (message: string) => {
  return {
    type: LoginActions.error,
    payload: message || "Unknown error"
  };
};

export const notify: ActionCreator<Action> = (message: string) => {
  return {
    type: LoginActions.notify,
    payload: message
  };
};

export const logout: ActionCreator<Action> = () => {
  return {
    type: LoginActions.logout
  };
};

export const logged: ActionCreator<Action> = () => {
  return {
    type: LoginActions.logged
  };
};

export const register: ActionCreator<Action> = (data: LoginData) => {
  return {
    type: LoginActions.register,
    payload: data
  };
};

export const noop: ActionCreator<Action> = () => {
  return {
    type: LoginActions.noop
  };
};
