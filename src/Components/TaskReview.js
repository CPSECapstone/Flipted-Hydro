import React, { useState } from 'react';
import ProgressBar from './ProgressBar.js';

//export default function TaskReview(props) {
export default function TaskReview() {

  const q = {
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
    }
  }
  
   const props = {
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
      ],
      "width": '700',
      "height": '10',
      "doneColor":'#4274F3',
      "leftColor":'rgb(108, 108, 133)',
      "total": 30,
      "done": 10
    };

   var total = 10;
   if(props.total) {
       total = props.total.toString();
   } else {
       console.warn('Total missing, default value of 10 being used');
   }
   const totalNum = total;
   var done = 1;
   if(props.done) {
       done = props.done.toString();
   } else {
       console.warn('Done missing, default value of 1 being used');
   }
   const doneNum = done;

    const mapRequirements = (req) => {
      if(!req) return [];
      return req.map(({description,id}) => (
        <div key={id}>
          <input type="checkbox" value="A1" id="A1"/> 
          <label for="A1">{description}</label>
        </div>))
    }

   function getScore(){
     var n = 0;
     for(var i = 0; i < q.data.submitTask.questionAndAnswers.length; i++){
      if(q.data.submitTask.questionAndAnswers[i].answer.pointsAwarded != 0){
        n++;
      }
     }
     return n
   }

   function scoreTotal(){
     return (q.data.submitTask.questionAndAnswers.length);
   }

   function scoreBar(){
     return ( <div> 
      <h2>Score: {getScore()}/{scoreTotal()} </h2>
      <ProgressBar 
      width='700'
      height='20'
      doneColor='#4274F3'
      leftColor='rgb(108, 108, 133)'
      total={scoreTotal()}
      done={getScore()}/></div>);
   }

   function pointBar(){
    return ( <div> 
    <h2>Points Gained: {q.data.submitTask.pointsAwarded}</h2>
    <ProgressBar 
    width='700'
    height='20'
    doneColor='#4274F3'
    leftColor='rgb(108, 108, 133)'
    total={q.data.pointsAwarded}
    done={q.data.pointsPossible}/></div>);
   }

   return(
      <div>
         <h2>{mapRequirements(props.requirements)}</h2>
         { scoreBar() }
         { pointBar() }
      </div>
   );
}