import { combineReducers, AnyAction } from "redux";
import { userReducer, UserState } from "./user.reducer";
import { tweetReducer, TweetState } from "./tweet.reducer";
import { loginReducer, LoginState } from "./login.reducer";

export interface RootState {
  user: UserState;
  tweet: TweetState;
  login: LoginState;
}

export const rootReducer = combineReducers<AnyAction>({
  user: userReducer,
  tweet: tweetReducer,
  login: loginReducer
});
