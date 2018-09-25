import { ActionCreator } from "react-redux";
import { Action } from "redux";

export const enum TweetActions {
  create = "TWEET_CREATE",
  delete = "TWEET_DELETE",
  update = "TWEET_UPDATE"
}

export const createTweet: ActionCreator<Action> = (tweet: Tweet) => {
  return {
    type: TweetActions.create,
    payload: tweet
  };
};

export const updateTweet: ActionCreator<Action> = (tweet: Tweet) => {
  return {
    type: TweetActions.update,
    payload: tweet
  };
};

export const deleteTweet: ActionCreator<Action> = (tweet: Tweet) => {
  return {
    type: TweetActions.delete,
    payload: tweet
  };
};
