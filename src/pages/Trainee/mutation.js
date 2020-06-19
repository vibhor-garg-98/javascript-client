import { gql } from 'apollo-boost';

const CREATE_TRAINEE = gql`
  mutation createTrainee($email: String!, $name: String!, $password: String!) {
    createTrainee(payload: { email: $email, password: $password, name: $name }){
      name,
      email,
    }
  }
`;

const UPDATE_TRAINEE = gql`
  mutation updateTrainee($email: String!, $name: String!, $id: ID!) {
    updateTrainee(payload: { email: $email, name: $name, id: $id })
  }
`;

const DELETE_TRAINEE = gql`
mutation deleteTrainee($id: ID!) {
  deleteTrainee(id: $id )
}
`;
export { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE };
