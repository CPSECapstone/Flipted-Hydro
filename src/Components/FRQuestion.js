import React, { useState } from 'react';
import { useMutation  } from '@apollo/client';
import { SAVE_FRQUESTION } from '../gqlQueries.js';
import { gql } from '@apollo/client';
import "./Question.css";

function FRQuestion(props) {
   const [response, setResponse] = useState(props.existingAnswer);
   let currentResponse = response;
   const [saveFRQuestion] = useMutation(SAVE_FRQUESTION, {
    update(cache) {

      const answerObject = {
        __typename: 'Answer',
        questionId: props.question.id
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
                answer: currentResponse,
              },
            });
            return {...existingProgress, answers: [...existingProgress.answers, newAnswerRef]};
          }
        }
      });
    }
  });

   function saveResponse(value){
    saveFRQuestion({
      variables: {
        taskId: props.context.taskId,
        blockId: props.context.blockId,
        questionId: props.question.id,
        answer: value
      }
    })
  }

    
   const updateText=(e)=>{
    setResponse(e.target.value);
  }

  const saveText=(e)=>{
    currentResponse = e.target.value;
    props.setAnswerCallback(e.target.value);
    saveResponse(e.target.value);
  }
 
    return (
      <div>
        <div className="chunk">
          <div className="questCard">
          <h2>{props.question.description}</h2>
          <form className="questionBlock">
              <textarea id="cname" name="cname" value={response}
                onChange={updateText}
                onBlur={saveText}/>
          </form>
          </div>
        </div>
      </div>
    );
 }
 
 export default FRQuestion;