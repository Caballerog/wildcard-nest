import { RootState } from "../reducers/index";

export const selectUsers = (state: RootState) => state.user.users;
