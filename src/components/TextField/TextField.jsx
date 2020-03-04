import React from 'react';
import Input from './style'

const TextField = (props) => {

   // console.log('props are :::::::',props);

     return <Input type="text" value={props.value} disabled={(props.disabled)} />
}
export default TextField;
