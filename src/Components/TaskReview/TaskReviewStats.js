import React from 'react';
import PercentageBar from './PercentageBar';

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
      <PercentageBar 
        awarded = {getScore()}
        total = {scoreTotal()}
        leftColor = '#EA6868'
        rightColor = '#E0E0E0'
      /></div>);
   }

   function pointBar(){
    return ( <div> 
    <h2>Points Gained: {submission.pointsAwarded} / {submission.pointsPossible}</h2>
    <PercentageBar 
        awarded = {submission.pointsAwarded}
        total = {submission.pointsPossible}
        leftColor = '#F2C94C'
        rightColor = '#E0E0E0'
      /></div>);
   }

   return(
      <div>
         { scoreBar() }
         { pointBar() }
      </div>
   );
}