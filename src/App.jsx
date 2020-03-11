import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './theme';
import ChildrenDemo from '../src/pages/ChildrenDemo/ChildrenDemo';
// import TextFieldDemo from '../src/pages/TextFieldDemo/TextFieldDemo';
// import InputDemo from './pages/InputDemo/InputDemo';

function App() {
  return (
    <div>
      <ThemeProvider theme={Theme}>
        <ChildrenDemo />
      </ThemeProvider>
    </div>
  );
}

export default App;
