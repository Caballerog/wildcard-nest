import * as sentiment from 'sentiment';
export class Tweet {
  text: string;
  created_at: string;
  username: string;
  name: string;
  verified: string;
  image: string;
  score: string;

  constructor(_tweet) {
    this.text = _tweet.text;
    this.created_at = _tweet.created_at;
    this.username = _tweet.user.screen_name;
    this.name = _tweet.user.name;
    this.verified = _tweet.user.verified;
    this.image = _tweet.user.profile_image_url_https;
    this.score = sentiment(_tweet.text).score;
  }
}
