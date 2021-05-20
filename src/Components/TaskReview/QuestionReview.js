import React from 'react';
import './TaskReview.css'

export default function QuestionReview(props) {
   const questionAndAnswer = props?.questionAndAnswer;
   const [type, id] = questionAndAnswer.question.id.split('#');

   function GetBlockColor() {
      if(type === 'FR_QUESTION') {
        return '#F2C94C';
      }
      if(questionAndAnswer.answer.pointsAwarded/questionAndAnswer.question.points >= 1) {
        return '#27AE60';
      }
      return '#EB5757';
   }

   function displayCorrectAnswer(){
      if(type == 'MC_QUESTION' && questionAndAnswer.answer.pointsAwarded == 0){
         return (
            <h2 className="questionReviewText">Correct Answer: { questionAndAnswer.answer.correctAnswer}</h2>
         );
      }
   }

   return (
      <div className="questionReviewContainer" style={{"backgroundColor": GetBlockColor()}}>
         <div>
            <h2 className="questionReviewText">{ questionAndAnswer.question.description }</h2>
            <h2 className="questionReviewText">You Answered: { questionAndAnswer.answer.answer }</h2>
            {displayCorrectAnswer()}
         </div>
         <div className="questionReviewPointsContainer">
            <h2 className="questionReviewText">Points Possible: { questionAndAnswer.question.points }</h2> 
            <h2 className="questionReviewText">Points Awarded: { questionAndAnswer.answer.pointsAwarded }</h2>
         </div>
      </div>
   )
}