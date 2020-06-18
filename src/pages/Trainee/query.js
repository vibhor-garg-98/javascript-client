import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
  query getTrainee($limit: Int, $skip: Int){
    getTrainee(data: { limit: $limit, skip: $skip }){
      records{
        name
        role
        email
        originalId
        _id
      },
      count
    }
  }
`;

export default GET_TRAINEE;
