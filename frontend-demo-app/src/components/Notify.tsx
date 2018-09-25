import * as React from "react";
import { NotifyShow } from "./styles";

export type NotifyProps = {
  clearNotify: Function;
  notify: string;
  time: number;
  opacity: number;
};

export class Notify extends React.Component<NotifyProps, {}> {
  state = {
    opacity: 0
  };

  componentWillReceiveProps(nextProps: NotifyProps) {
    if (
      nextProps.notify !== "" &&
      nextProps.notify !== "{}" &&
      nextProps.notify !== {}
    ) {
      this.setState({
        opacity: this.props.opacity
      });
      setTimeout(() => this.props.clearNotify(""), this.props.time * 1000);
    } else {
      this.setState({
        opacity: 0
      });
    }
  }
  render() {
    return (
      <NotifyShow opacity={this.state.opacity}>{this.props.notify}</NotifyShow>
    );
  }
}
