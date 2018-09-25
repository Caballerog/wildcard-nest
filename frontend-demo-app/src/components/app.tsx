import * as React from "react";
import {
  selectUsers,
  selectTweets,
  selectLogged,
  selectError,
  selectNotify
} from "../State/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { login, logout, register, loginError, notify } from "../State/actions";
import { UsersList } from "./usersList";
import { TweetsList } from "./tweetsList";
import { Container, FixedTop } from "./styles";
import { Login } from "./login";
import { ErrorShow } from "./ErrorShow";
import { Notify } from "./Notify";

const mapDispatchToProps = {
  login,
  register,
  logout,
  clearError: loginError,
  clearNotify: notify
};

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  tweets: selectTweets,
  logged: selectLogged,
  error: selectError,
  notify: selectNotify
});

export type AppProps = {
  users: User[];
  tweets: Tweet[];
  login: Function;
  logged: boolean;
  register: Function;
  logout: Function;
  clearError: Function;
  clearNotify: Function;
  error: string;
  notify: string;
};

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<AppProps, {}> {
  render() {
    const {
      login,
      logout,
      register,
      tweets,
      logged,
      users,
      clearError,
      error,
      clearNotify,
      notify
    } = this.props;
    return (
      <>
        <Notify
          clearNotify={clearNotify}
          notify={notify}
          opacity={1}
          time={3}
        />
        <ErrorShow
          error={error}
          clearError={clearError}
          opacity={0.8}
          time={4}
        />
        <FixedTop>
          <button onClick={() => window.NestJS()}>NestJS</button>{" "}
          <button onClick={() => window.FeathersJS()}>FeathersJS</button>
        </FixedTop>
        <Container>
          {!logged && (
            <Login login={login} logout={logout} register={register} />
          )}

          {logged && (
            <>
              <UsersList users={users} />
              <TweetsList tweets={tweets} />
            </>
          )}
        </Container>
      </>
    );
  }
}
