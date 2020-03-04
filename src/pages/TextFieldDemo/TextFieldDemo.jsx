import React from "react";
import TextField from '../../components/TextField/TextField';
import {P,Div} from '../../components/TextField/style'
import Slider from "../../components/Slider/Slider";
import {banners} from '../../configs/constants'

const TextfieldDemo = () => (

  <Div >
     <Slider altText='image not load' banners={banners} defaultBanner='default.png' duration={2000} height={200} random={false}/>
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
