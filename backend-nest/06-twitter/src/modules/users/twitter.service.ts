import { Component, Inject } from '@nestjs/common';
import { Tweet } from './interfaces/tweet.class';

import * as Twitter from 'twitter';

@Component()
export class TwitterService {
  client: Twitter.Twitter;
  stream: Twitter.stream;
  constructor() {
    this.client = new Twitter({
      consumer_key: 'LSNiYQjiUgcwvvwEzAEJq7sgn',
      consumer_secret: 'bWRud9irmhe1Qe3obwdkKcW8f79VLh21OfiKU4WAWxt4xzAcUF',
      access_token_key: '210553564-MFzb0h0j9hJqmf9GyWobrES1SoV4r20kxyh5A2tF',
      access_token_secret: 'NARXlchd0flvbZjMYX9sPWCSvKzGGcqQWyMvOTyuxgcvy',
    });
    this.stream = this.client.stream('statuses/filter', { track: 'javascript' });

    this.stream.on('data', event => console.log('event', new Tweet(event)));

    this.stream.on('error', error => {
      throw error;
    });
  }
}
