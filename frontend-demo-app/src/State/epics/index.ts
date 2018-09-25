import { combineEpics } from "redux-observable";
import { loginEpic, logoutEpic, registerEpic } from "./login.epic";

export const rootEpic = combineEpics(loginEpic, logoutEpic, registerEpic);
