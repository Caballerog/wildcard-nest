import { RootState } from "../reducers/index";

export const selectLogged = (state: RootState) => state.login.logged;

export const selectError = (state: RootState) => state.login.error;

export const selectNotify = (state: RootState) => state.login.notify;
