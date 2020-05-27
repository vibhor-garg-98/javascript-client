import React from 'react';
import { ThemeProvider, Typography } from '@material-ui/core';
import Text from '../../components/Math/Math';
import Theme from '../../theme';

const CalculatorDemo = () => (
  <>
    <Text first={7} second={4} operator="+" />
    <Text first={7} second={3} operator="-" />
    <Text first={7} second={20} operator="*" />
    <Text first={7} second={0} operator="/" />
    <Text first={9} second={5} operator="^" />
    <Text first={7} second={4} operator="+">
      {
        (first, second, result) => (
          `Sum of ${first} and ${second} is equal to ${result}`
        )
      }
    </Text>
    <ThemeProvider theme={Theme}>
      <Typography>
        <Text first={3} second={4} operator="+">
          {
            (first, second, result) => (
              `Sum of ${first} and ${second} is equal to ${result}`
            )
          }
        </Text>
      </Typography>
    </ThemeProvider>
  </>
);

export default CalculatorDemo;
