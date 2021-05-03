import { gql } from '@apollo/client';

export const GET_ALL_COURSES = gql`
  {
    courses {
      id  
      name
    }
  }
`;

export const ADD_COURSE = gql`
  mutation AddCourse($name: String!){
    addCourse(
      name: $name
    ){
      name
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: String!){
    deleteCourse(
      id: $id
    )
  }
`;

export const GET_TASK = gql`
  query getTask($id: String!){
    task(taskId: $id){
      id
      name
      instructions
      points
      startAt
      endAt
      dueDate
      parentMissionId
      parentMissionIndex
      objectiveId
      pages {
        blocks {
          title
          ... on ImageBlock {
            imageUrl
          }
          ... on TextBlock {
            contents
            fontSize
          }
          ... on VideoBlock {
            videoUrl
          }        
        }
      }
    }
  }
`;