import React from 'react';
import { Typography } from '@material-ui/core';

class NoMatch extends React.Component {
  render(){
    return (
      <>
        <Typography component="h1" align="center" variant="h4">
          Not Found
        </Typography>

        <Typography component="h1" align="center">
         <p style={{color:"grey"}}>
         Seem like the page you looking after does not exist.
         </p>
        </Typography>
      </>
    )
  }
}

export default NoMatch;
