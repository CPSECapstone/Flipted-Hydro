import React from 'react';
import { TaskReviewService } from './TaskReviewLogic';
import { useHistory } from 'react-router';
import { useState } from 'react';
import './TaskReview.css';
import {oBarBlueStyle, oBarBlueStyleLeft, oBarBlueStyleRight, oBarGrayStyle, oBarGrayStyleLeft, oBarGrayStyleRight, reviewButtonStyle, clButtonStyle} from './TaskReviewStyles.js'
import QuizReview from './QuizReview';
import TaskReviewHelp from './TaskReviewHelp';
import TaskReviewResults from './TaskReviewResults';

export default function TaskReview(props) {
  console.log(props);
  const submission = props?.location?.state?.submitTask;
  const task = props?.location?.state?.task;
  const hist = useHistory();
  const taskQAs = TaskReviewService.combineQuestionDataWithQAs(task, submission.questionAndAnswers);
  const [focusedQA, setFocusedQA] = useState(taskQAs[0]);
  const [compDisplayed, setCompDisplayed] = useState('quiz-review');
  const [oBarStyleArray, setOBarStyleArray] = useState([oBarBlueStyleLeft, oBarGrayStyle, oBarGrayStyleRight]);

  function onClickQuizReview() {
    setCompDisplayed('quiz-review');
    setOBarStyleArray([oBarBlueStyleLeft, oBarGrayStyle, oBarGrayStyleRight]);
  }

  function onClickTaskResults() {
    setCompDisplayed('task-results');
    setOBarStyleArray([oBarGrayStyleLeft, oBarBlueStyle, oBarGrayStyleRight]);
  }

  function onClickGetHelp() {
    setCompDisplayed('get-help');
    setOBarStyleArray([oBarGrayStyleLeft, oBarGrayStyle, oBarBlueStyleRight]);
  }

  function renderOptions() {
    return(
      <div className='options-bar-wrapper'>
        <div className='options-bar'>
        <h2 onClick = {() => {onClickQuizReview()}} style = {oBarStyleArray[0]}>Quiz Review</h2>
        <h2 onClick = {() => {onClickTaskResults()}} style = {oBarStyleArray[1]}>Task Results</h2>
        <h2 onClick = {() => {onClickGetHelp()}} style = {oBarStyleArray[2]}>Get Help</h2>
        </div>
      </div>
    );
  }

  function renderComp() {
    console.log(props.location.state.submitTask.questionAndAnswers);
    if(compDisplayed === 'quiz-review') {
      return(<QuizReview 
        pointsAwarded={props.location.state.submitTask.pointsAwarded}
        pointsTotal={props.location.state.submitTask.pointsPossible}
        // qa={props.location.state.submitTask.questionAndAnswers}
        qa={taskQAs}
      />);
    }
    else if(compDisplayed === 'get-help') {
      return(<TaskReviewHelp/>);
    }
    else if(compDisplayed === 'task-results') {
      return(<TaskReviewResults 
        submission = {submission}
      />);
    }
  }

  function getHeader() {
    if(compDisplayed === 'quiz-review') {
      return 'QUIZ REVIEW';
    }
    else if(compDisplayed === 'get-help') {
      return 'GET HELP';
    }
    else if(compDisplayed === 'task-results') {
      return 'TASK RESULTS!';
    }
  }

  function continueToMission() {
    hist.push({
      pathname: '/mission',
      state: {
        id: task.missionId
      }
    });
  }

  function getButtons() {
    return(
      <div className='task-review-buttons'>
        <button style={reviewButtonStyle()} onClick={() => {hist.goBack()}}>{"<   Review Tasks"}</button>
        <button style={clButtonStyle()} onClick={continueToMission}>{"Continue Learning   >"}</button>
      </div>
    );
  }

  return (
    <div className='task-review'>
      <h1>{getHeader()}</h1>
      <h2>{`TASK: ${task.name}`}</h2>
      { renderOptions() }
      { renderComp() }
      { getButtons() }
    </div>
  );
}