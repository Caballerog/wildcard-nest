import * as React from "react";
import { ContainerColumn } from "./styles";

export type UsersListProps = {
  users: User[];
};

export class UsersList extends React.Component<UsersListProps, {}> {
  render() {
    return (
      <ContainerColumn>
        <h1>Users:</h1>
        {this.props.users.map((u, i) => <div key={i}>{u.name}</div>)}
      </ContainerColumn>
    );
  }
}
