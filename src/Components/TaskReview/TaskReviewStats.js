import React from 'react';
import ProgressBar from '../ProgressBar.js';

//export default function TaskReview(props) {
export default function TaskReviewStats(props) {

   function getScore(){
     var n = 0;
     for(var i = 0; i < props.data.submitTask.questionAndAnswers.length; i++){
      if(props.data.submitTask.questionAndAnswers[i].answer.pointsAwarded !== 0){
        n++;
      }
     }
     return n
   }

   function scoreTotal(){
     return (props.data.submitTask.questionAndAnswers.length);
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
    <h2>Points Gained: {props.data.submitTask.pointsAwarded}</h2>
    <ProgressBar 
    width='700'
    height='20'
    doneColor='#F2C94C'
    leftColor='rgb(108, 108, 133)'
    total={props.data.pointsAwarded}
    done={props.data.pointsPossible}/></div>);
   }

   return(
      <div>
         { scoreBar() }
         { pointBar() }
      </div>
   );
}