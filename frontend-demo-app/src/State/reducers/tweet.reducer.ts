import { Reducer, AnyAction } from "redux";
import { Tweet, TweetActions } from "../actions/tweet.actions";

export type TweetState = {
  tweets: Tweet[];
};

const INITIAL_STATE = {
  tweets: []
};

export const tweetReducer: Reducer<TweetState> = (
  state: TweetState = INITIAL_STATE,
  action: {
    type: TweetActions;
    payload: Tweet;
  }
) => {
  switch (action.type) {
    case TweetActions.create:
      return {
        ...state,
        tweets: [...state.tweets, action.payload]
      };
    case TweetActions.update:
      return {
        ...state,
        tweets: [
          ...state.tweets.filter(u => u.id !== action.payload.id),
          action.payload
        ]
      };
    case TweetActions.delete:
      return {
        ...state,
        tweets: [...state.tweets.filter(u => u.id !== action.payload.id)]
      };
    default:
      return state;
  }
};
