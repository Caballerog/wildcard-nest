import * as React from "react";
import { Alert } from "./styles";

export type ErrorShowProps = {
  clearError: Function;
  error: string;
  time: number;
  opacity: number;
};

export class ErrorShow extends React.Component<ErrorShowProps, {}> {
  state = {
    opacity: 0
  };

  timeout: NodeJS.Timer;

  componentWillReceiveProps(nextProps: ErrorShowProps) {
    if (nextProps.error !== "-" && nextProps.error !== "") {
      if (this.timeout) clearTimeout(this.timeout);
      this.setState({
        opacity: this.props.opacity
      });
      this.timeout = setTimeout(
        () => this.props.clearError("-"),
        this.props.time * 1000
      );
    } else {
      this.setState({
        opacity: 0
      });
    }
  }
  render() {
    return <Alert opacity={this.state.opacity}>{this.props.error}</Alert>;
  }
}
