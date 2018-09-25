import * as React from "react";
import { ContainerColumn, Input, Button } from "./styles";

export type LoginProps = {
  login: Function;
  logout: Function;
  register: Function;
};

export class Login extends React.Component<LoginProps, {}> {
  state = {
    user: "",
    pass: ""
  };

  onLogin = () => {
    this.props.login({
      user: this.state.user,
      pass: this.state.pass
    });
  };

  onRegister = () => {
    this.props.register({
      user: this.state.user,
      pass: this.state.pass
    });
  };

  onLogout = () => {
    this.props.logout();
  };

  onChange = (property: string) => event => {
    this.setState({
      [property]: event.target.value
    });
  };

  render() {
    return (
      <ContainerColumn>
        <Input type="text" onChange={this.onChange("user")} />
        <Input type="password" onChange={this.onChange("pass")} />
        <Button onClick={this.onLogin}>Login</Button>
        <Button onClick={this.onRegister}>Register</Button>
        <Button onClick={this.onLogout}>Logout</Button>
      </ContainerColumn>
    );
  }
}
