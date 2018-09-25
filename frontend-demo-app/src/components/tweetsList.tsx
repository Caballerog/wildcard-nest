import * as React from "react";
import { ContainerColumn, Tweet } from "./styles";

export type TweetsListProps = {
  tweets: Tweet[];
};

export class TweetsList extends React.Component<TweetsListProps, {}> {
  render() {
    return (
      <ContainerColumn>
        <h1>Tweets:</h1>
        {this.props.tweets.map((u, i) => <Tweet key={i}>{u.text}</Tweet>)}
      </ContainerColumn>
    );
  }
}
