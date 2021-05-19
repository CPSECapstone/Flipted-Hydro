import React from 'react';
import TaskReviewStats from './TaskReviewStats.js';
import QAScreen from './QAScreen.js'
import QuestionReview from './QuestionReview'
import { useHistory } from 'react-router';
import { useState } from 'react';
import './TaskReview.css';

function getTaskQuestions(task){
  let questions = [];
  task.pages.forEach(page => [
    page.blocks.forEach(block => {
      if(block.__typename == 'QuizBlock'){
        questions = questions.concat(block.questions);
      }
    })
  ])
  return questions;
}

function getAnswerForQA(qa, questions){
  const question = questions.filter(question => question.id == qa.question.id)[0]

  if(!question || question.__typename == 'FrQuestion'){
    return qa.answer.answer;
  }

  const index = parseInt(qa.answer.answer);

  return {
    answer: question.options[index].description,
    correctAnswer:  question.options[qa.question.answers[0]].description
  };
}

function getTaskQAs(task, qas){
  const questions = getTaskQuestions(task);
  return qas.map(qa => {
    return {
      ...qa,
      answer: {
        ...(qa.answer),
        ...(getAnswerForQA(qa, questions))
      }
    }
  })
}

export default function TaskReview(props) {

  const submission = props?.location?.state?.submitTask;
  const task = props?.location?.state?.task;
  const hist = useHistory();
  const taskQAs = getTaskQAs(task, submission.questionAndAnswers);
  const [focusedQA, setFocusedQA] = useState(taskQAs[0]);

  const mapRequirements = (req) => {
    if (!req) return [];
    return req.map(({ description, id }) => (
      <div key={id}>
        <input type="checkbox" value="A1" id="A1" checked={true}/>
        <label for="A1">{description}</label>
      </div>))
  }

  function continueToMission() {
    hist.push({
      pathname: '/mission',
      state: {
        id: task.missionId
      }
    });
  }
  return (
    <div>
      <h1>Task Review</h1>
      <div className="row">
        <div className="column">
          <div>
            <h1>Questions</h1>
            <QAScreen questionAndAnswers={taskQAs} height="300px"
              setFocusedQACallback={(qa) => setFocusedQA(qa)}/>
          </div>
        </div>
        <div className="column">
          <h2>Selected Question</h2>
          <QuestionReview questionAndAnswer={focusedQA}/>
        </div>
        <div className="column">
          <h1>Requirements</h1>
          <h2>{mapRequirements(task.requirements)}</h2>
        </div>
      </div>
      <h1>Results</h1>
      <div><TaskReviewStats submission={submission} /></div>
      <div className="continueButtonContainer"><button style={{"position": "inherit"}} onClick={continueToMission}>Continue</button></div>
    </div>
  );
}