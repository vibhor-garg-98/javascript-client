import styled, { css } from 'styled-components';

const Input = styled.input`
  ${(props) => props.value === 'Disabled input'
    && css`
      width: 100%;
    `};
  ${(props) => props.value === 'Accessible'
    && css`
      width: 100%;
    `};
  ${(props) => props.value === '101'
    && css`
      width: 100%;
      border-color: red;
    `};
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;
const P = styled.p`
  color: red;
  font-size: 12px;
  margin: auto;
`;
const Div = styled.div`
  border: 1px solid black;
  padding: 6px;
`;

export default Input;
export { P, Div };
