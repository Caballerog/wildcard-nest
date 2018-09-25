import * as React from "react";
import styled from "styled-components";

export const Container = styled.div`
  padding: 2em;
  margin: 2em;
  display: flex;
  border: 1px solid gray;
  border-radius: 10px;
  justify-content: space-around;
`;

export const ContainerColumn = styled.div`
  padding: 2em;
  margin: 2em;
  display: flex;
  border: 1px solid gray;
  border-radius: 10px;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 1rem;
`;

export const Tweet = styled.div`
  border: 1px solid skyblue;
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  text-overflow: ellipsis;
`;

export const FixedTop = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  opacity: 0.5;
  padding: 10px;
  border-radius: 0 0 7px 7px;
`;

export const Button = styled.button`
  margin: 0.1rem;
`;

export const Alert = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background-color: red;
  padding: 1em;
  opacity: ${props => `${props.opacity}`};
  transition: all 500ms ease-in-out;
  width: 50%;
  text-align: center;
  border-radius: 10px 10px 0 0;
`;

export const NotifyShow = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background-color: green;
  padding: 0.6em;
  opacity: ${props => `${props.opacity}`};
  transition: all 500ms ease-in-out;
  width: 50%;
  text-align: center;
  border-radius: 0 0 10px 10px;
  z-index: 4000;
  pointer-events: none;
`;
