import { UserActions, User } from "../actions/user.actions";
import { Reducer, AnyAction } from "redux";

export type UserState = {
  users: User[];
};

const INITIAL_STATE = {
  users: []
};

export const userReducer: Reducer<UserState> = (
  state: UserState = INITIAL_STATE,
  action: {
    type: UserActions;
    payload: User;
  }
) => {
  switch (action.type) {
    case UserActions.create:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case UserActions.update:
      return {
        ...state,
        users: [
          ...state.users.filter(u => u.name !== action.payload.name),
          action.payload
        ]
      };
    case UserActions.delete:
      return {
        ...state,
        users: [...state.users.filter(u => u.name !== action.payload.name)]
      };
    default:
      return state;
  }
};
