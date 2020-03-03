import styled, {css} from 'styled-components'


const Input = styled.input`
  ${(props) => props.value === 'Disabled input' && css
    `width: 100%;
  `};
  ${(props) => props.value === 'Accessible' && css
    `width:100%;`
  };
  ${(props) => props.value === '101' && css
    `width:100%;
     border-color:red
    `
  };
`;
const P =styled.p`
 color:red;
`;
const Div = styled.div`
  border: 1px solid black;
  padding: 6px;
`;
export default Input
export {P,Div}  ;
