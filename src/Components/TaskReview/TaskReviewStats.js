import React from 'react';
import ProgressBar from '../ProgressBar.js';

//export default function TaskReview(props) {
export default function TaskReviewStats(props) {

  const submission = props?.submission;

   function getScore(){
     var n = 0;
     for(var i = 0; i < submission.questionAndAnswers.length; i++){
      if(submission.questionAndAnswers[i].answer.pointsAwarded !== 0){
        n++;
      }
     }
     return n
   }

   function scoreTotal(){
     return (submission.questionAndAnswers.length);
   }

   function scoreBar(){
     return ( <div> 
      <h2>Questions Correct: {getScore()}/{scoreTotal()} </h2>
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
    <h2>Points Gained: {submission.pointsAwarded} / {submission.pointsPossible}</h2>
    <ProgressBar 
    width='700'
    height='20'
    doneColor='#F2C94C'
    leftColor='rgb(108, 108, 133)'
    total={submission.pointsPossible}
    done={submission.pointsAwarded}/></div>);
   }

   return(
      <div>
         { scoreBar() }
         { pointBar() }
      </div>
   );
}