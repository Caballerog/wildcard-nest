import { RootState } from "../reducers/index";

export const selectTweets = (state: RootState) => state.tweet.tweets;
