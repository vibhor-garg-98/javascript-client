import React from "react";
import TextField from '../../components/TextField/TextField';
import {P,Div} from '../../components/TextField/style'

const TextfieldDemo = () => (

  <Div >
    <p><b>This is disabled input</b></p>
    <TextField  value='Disabled input' disabled/>
    <p><b>A valid input</b></p>
    <TextField value='Accessible' />
    <p><b>A input with error</b></p>
    <TextField value='101' />
    <P>Could not be greater than</P>
  </Div>

);

export default TextfieldDemo;
