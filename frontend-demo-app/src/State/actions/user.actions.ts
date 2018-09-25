import { ActionCreator } from "react-redux";
import { Action } from "redux";

export const enum UserActions {
  create = "USER_CREATE",
  delete = "USER_DELETE",
  update = "USER_UPDATE"
}

export const createUser: ActionCreator<Action> = (user: User) => {
  return {
    type: UserActions.create,
    payload: user
  };
};

export const updateUser: ActionCreator<Action> = (user: User) => {
  return {
    type: UserActions.update,
    payload: user
  };
};

export const deleteUser: ActionCreator<Action> = (user: User) => {
  return {
    type: UserActions.delete,
    payload: user
  };
};
