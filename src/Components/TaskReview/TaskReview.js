import React from 'react';
import TaskReviewStats from './TaskReviewStats.js';
import QAScreen from './QAScreen.js'
import QuestionReview from './QuestionReview'

export default function TaskReview() {

  const props = {
    "data": {
      "submitTask": {
        "graded": false,
        "pointsAwarded": 10,
        "pointsPossible": 15,
        "questionAndAnswers": [
          {
            "question": {
              "id": "FR_QUESTION#d1b687205e4",
              "description": "Give some examples of molecules that contain covalent bonds",
              "points": 10,
              "feedback": null
            },
            "answer": {
              "questionId": "FR_QUESTION#d1b687205e4",
              "pointsAwarded": 0,
              "answer": "Hydrogen, Ammonia, etc."
            }
          },
          {
            "question": {
              "id": "MC_QUESTION#2cb7e34fcb6",
              "description": "What is a covalent bond?",
              "points": 5,
              "feedback": null
            },
            "answer": {
              "questionId": "MC_QUESTION#2cb7e34fcb6",
              "pointsAwarded": 0,
              "answer": "0"
            }
          },
          {
            "question": {
              "id": "MC_QUESTION#6bc78eb2165",
              "description": "Atoms bond together in order to...",
              "points": 5,
              "feedback": null
            },
            "answer": {
              "questionId": "MC_QUESTION#6bc78eb2165",
              "pointsAwarded": 5,
              "answer": "1"
            }
          },
          {
            "question": {
              "id": "MC_QUESTION#9347b1c758f",
              "description": "The electrons involved in bonding are ...",
              "points": 5,
              "feedback": null
            },
            "answer": {
              "questionId": "MC_QUESTION#9347b1c758f",
              "pointsAwarded": 5,
              "answer": "2"
            }
          }
        ],
        "teacherComment": null
      }
    },
    "id": "4f681550ba9",
    "name": "Introduction to Covalent Bonding",
    "instructions": "Analyze the content and answer the questions",
    "points": 20,
    "dueDate": "2021-05-30",
    "parentMissionId": "da0719ba103",
    "parentMissionIndex": 0,
    "requirements": [
      {
        "id": "f681550ba90",
        "description": "Understand the structure of covalent bonds"
      },
      {
        "id": "681550ba909",
        "description": "Understand the properites of covalent bonds"
      }
    ]
  }
    const mapRequirements = (req) => {
      if(!req) return [];
      return req.map(({description,id}) => (
        <div key={id}>
          <input type="checkbox" value="A1" id="A1"/> 
          <label for="A1">{description}</label>
        </div>))
    }

    const getStats = () => {
      return <div>{TaskReviewStats(props)}</div>
    }

    const getQAReview = () => {
      return <div>
      <h1>QUESTION LIST</h1>
      {QAScreen(props.data.submitTask.questionAndAnswers)}
      </div>
    }

   return(
      <div className="row">
        <div className = "column">
          { getQAReview() }
        </div>
        <div className = "column">
          <h1>QUESTION FEEDBACK</h1>
          {QuestionReview(props.data.submitTask.questionAndAnswers[0])}
        </div>
        <div className = "column">
          <h1>REQUIREMENT PROGRESS</h1>
          <h2>{mapRequirements(props.requirements)}</h2>
          <h1>TASK RESULTS</h1>
          { getStats() }
        </div>
      </div>
   );
}