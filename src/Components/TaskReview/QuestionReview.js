import React from 'react';

export default function QuestionReview(props) {
   return (
      <div>
         <h2>Question Description:</h2> 
         <h2>{ props.question.description }</h2>
         <h2>Points Possible: { props.question.points }</h2> 
         <h2>Your Answer: { props.answer.answer }</h2> 
         <h2>Points Awarded: { props.answer.pointsAwarded }</h2> 
      </div>
   )
}