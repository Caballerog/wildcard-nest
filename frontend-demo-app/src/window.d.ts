interface Window {
  _createUser: (user: User) => void;
  _updateUser: (user: User) => void;
  _deleteUser: (user: User) => void;

  _createTweet: (tweet: Tweet) => void;
  _updateTweet: (tweet: Tweet) => void;
  _deleteTweet: (tweet: Tweet) => void;

  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<{}>;
  register: (data: LoginData) => Promise<void>;
  notify: (message: string) => void;
  error: (message: string) => void;

  NestJS: () => void;
  FeathersJS: () => void;
}

type Tweet = {
  id: string;
  text: string;
  created_at: Date;
  username: string;
  name: string;
  verified: boolean;
  image: string;
};

type User = {
  name: string;
  company: string;
  age: string;
};

type LoginData = {
  user: string;
  pass: string;
};

declare var window: Window;
