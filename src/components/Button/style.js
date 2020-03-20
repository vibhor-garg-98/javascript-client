import styled, { css } from 'styled-components';

export const Buttons = styled.button`
  ${(props) => props.type === 'cancle'
    && css`
      background-color: lightgrey;
      border: none;
      color: black;
      padding: 12px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 6px;
    `};
  ${(props) => props.type === 'Back'
    && css`
      background-color: lightgrey;
      border: none;
      color: black;
      padding: 12px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 6px;
    `};
  ${(props) => props.disabled === true
    && props.type === 'submit'
    && css`
      background-color: #d0d3d4;
      border: none;
      color: #b3b6b7;
      padding: 12px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 6px;
    `};
  ${(props) => props.disabled === false
    && props.type === 'submit'
    && css`
      background-color: #4caf50;
      border: none;
      color: white;
      padding: 12px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 6px;
    `};
`;
