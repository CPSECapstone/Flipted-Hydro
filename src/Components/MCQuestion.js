import React, { useState, useEffect } from 'react';
import { useMutation  } from '@apollo/client';
import { SAVE_MCQUESTION } from '../gqlQueries.js';
import { gql } from '@apollo/client';
import "./Question.css";


function MCQuestion(props) {
  const [answer,setAnswer]=useState(props.existingAnswer);
  let currentAnswer = answer;
  const [saveMCQuestion] = useMutation(SAVE_MCQUESTION, {
    update(cache) {

      const answerObject = {
        __typename: 'Answer',
        questionId: props.question.id,
        answer
      }

      cache.modify({
        fields: {
          retrieveQuestionProgress(existingProgress = {}) {
            const newAnswerRef = cache.writeFragment({
              id: cache.identify(answerObject),
              fragment: gql`
                fragment MyAnswer on Answer {
                  answer
                }
              `,
              data: {
                answer: currentAnswer,
              },
            });
            return {...existingProgress, answers: [...existingProgress.answers, newAnswerRef]};
          }
        }
      });
    }
  });

  useEffect(() => {
    setAnswer(props.existingAnswer);
  }, [props.existingAnswer])

  function saveResponse(value){ 
    saveMCQuestion({
      variables: {
        taskId: props.context.taskId,
        blockId: props.context.blockId,
        questionId: props.question.id,
        answerId: parseInt(value)
      }
    })
  }

  const handleChange=(e)=>{
    currentAnswer = e.target.value;
    setAnswer(e.target.value);
    props.setAnswerCallback(e.target.value);
    saveResponse(e.target.value);   
  }

  const renderAnswerChoices = () => {
    return props.question.options.map((answerChoice, index) => {
      return (
        <div key={index}>
          <div className="answerChoiceItem">
            <label> 
              <input type="radio" value={index} id={index} name="AnswerChoices" onChange={handleChange}
              checked={answer == index? "checked" : ""} /> 
              {answerChoice.description}
            </label>
          </div>
        </div>
      );
    })
  }

   return (
    <div className="chunk">
      <div className="questCard">
      <h2>{props.question.description}</h2>
      <form className="questionBlock">
        {renderAnswerChoices()}
      </form>
      </div>
    </div>
  );
}

export default MCQuestion;