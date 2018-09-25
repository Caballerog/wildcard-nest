import { Reducer, AnyAction } from "redux";
import { LoginActions } from "../actions/index";

export type LoginState = {
  logged: boolean;
  error: string;
  notify: string;
};

const INITIAL_STATE = {
  logged: false,
  error: "-",
  notify: ""
};

export const loginReducer: Reducer<LoginState> = (
  state: LoginState = INITIAL_STATE,
  action: {
    type: LoginActions;
    payload: object | null;
  }
) => {
  switch (action.type) {
    case LoginActions.login:
      return state;
    case LoginActions.error:
      return {
        ...state,
        error: action.payload
      };
    case LoginActions.notify:
      return {
        ...state,
        notify: action.payload
      };
    case LoginActions.logout:
      return {
        ...state,
        logged: false
      };
    case LoginActions.logged:
      return {
        ...state,
        logged: true,
        error: ""
      };
    case LoginActions.register:
      return state;
    default:
      return state;
  }
};
