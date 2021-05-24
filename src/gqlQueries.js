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
      missionId
      missionIndex
      pages {
        skippable
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
          ... on QuizBlock{
            blockId
            questions{
              ... on FrQuestion{
                id
                description
              }
              ... on McQuestion {
                id
                description
                points
                options {
                  description
                }
              }
            }
          }        
        }
      }
      requirements {
        id 
        description
      }
    },
    retrieveQuestionProgress(taskId: $id){
      answers{
        questionId
        pointsAwarded
        answer
      }
    }
  }
`;

export const GET_MISSION = gql`
  query getMission($id: String!){
    mission(missionId: $id) {
      id
      course
      name
      description
      missionContent{
        ... on Task{
          id
          name
          instructions
          points
          dueDate
          missionId
          missionIndex
          requirements{
            id
            description
          }
        }
        ... on SubMission{
          id
          name
          description
        }
      }
    }
  }
`;

export const GET_COURSE = gql`
  query getCourse($id: String!){
    courseInfo(courseId: $id){
      courseId
      course
      instructor
      description
    }
  }
`;

export const SAVE_MCQUESTION = gql`
  mutation saveMCQuestion($taskId: String!, $blockId: String!, $questionId: String!, $answerId: Int!) {
    saveMultipleChoiceProgress(mcBlockInput: {
      taskId: $taskId
      questionBlockId: $blockId
      questionId: $questionId
      answerId: $answerId
    })
  }
`;

export const SAVE_FRQUESTION = gql`
  mutation saveFRQuestion($taskId: String!, $blockId: String!, $questionId: String!, $answer: String!){
    saveFreeResponseProgress(frBlockInput: {
      taskId: $taskId
      questionBlockId: $blockId
      questionId: $questionId
      answer: $answer
    })
  }
`;

export const GET_MISSIONS = gql`
  query getMissions($id: String!){
    missions(course: $id) {
      id
      name
      description
    }
  }
`;

export const GET_ALL_GOALS = gql`
  query {
    getAllGoals{
      id
      title
      dueDate
      completed
      completedDate
      subGoals{
        title
        dueDate
        completed
        completedDate
      }
      category
      favorited
      owner
      assignee
      pointValue
    }
  }
`;

export const SUBMIT_TASK_PROGRESS = gql`
  mutation submitTaskProgress($id: String!, $finishedRequirements: [String!]!){
    submitTaskProgress(taskProgress: {
      taskId: $id
      finishedRequirementIds: $finishedRequirements
    })
  }
`;

export const GET_TASK_AND_PROGRESS = gql`
  query getTask($id: String!){
    task(taskId: $id){
      id
      name
      instructions
      points
      startAt
      endAt
      dueDate
      missionId
      missionIndex
      pages {
        skippable
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
          ... on QuizBlock{
            blockId
            questions{
              ... on FrQuestion{
                id
                description
              }
              ... on McQuestion {
                id
                description
                points
                options {
                  description
                }
              }
            }
          }        
        }
      }
      requirements {
        id 
        description
      }
    },
    retrieveQuestionProgress(taskId: $id){
      answers{
        questionId
        pointsAwarded
        answer
      }
    },
    retrieveTaskProgress(taskId: $id){
      taskId
      username
      finishedRequirementIds
    }
  }
`;


export const EDIT_OR_CREATE_GOAL = gql`
  mutation editOrCreateGoal($goalInput: GoalInput!){
    editOrCreateGoal(goal: $goalInput)
  }
`;

export const GET_TASK_PROGRESS = gql`
  query getTask($id: String!){
    retrieveTaskProgress(taskId: $id){
      taskId
      username
      finishedRequirementIds
    }
  }
`;

export const GET_ALL_MISSION_PROGRESS = gql`
  query getMissionsProgress($id: String!) {
    getAllMissionProgress(courseId: $id) {
      mission {
        id
        name
      }
      progress {
        taskId
        name
        submission{
          graded
        }
      }
      student
    }
  }
`;
 
export const SUBMIT_TASK = gql`
  mutation submitTask($taskId: String!){
    submitTask(taskId: $taskId){
      graded
      pointsAwarded
      pointsPossible
      questionAndAnswers {
        question {
          ... on McQuestion {
            id
            description
            points
            feedback
            answers
          }
          ... on FrQuestion {
            id
            description
            points
            feedback
          }
        }
        answer {
          questionId
          pointsAwarded
          answer
        }
      }
      teacherComment
    }
  }
`;



export const GET_ALL_TARGET_PROGRESS = gql `
  query getTargetProgress($id: String!) {
    getAllTargetProgress(courseId: $id) {
      target {
        targetId
        targetName
      }
      objectives {
        objectiveId
      	objectiveName
        tasks {
          mastery
          task {
            id
            name
          }
        }
      }
      student
    }
  }
`;

export const GET_TARGETS = gql `
  query getTargets($id: String!) {
    targets(course: $id) {
      targetId
      targetName
    }
  }
`;
