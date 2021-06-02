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
  const [activeTab, setActiveTab] = React.useState(1);

  function ReviewTabs() {
    return (
        <div className="tabButtonContainer" style={{width: "450px"}}>
          <button className={activeTab==1 ? "tabButton" : "tabButtonNotActive" } onClick={()=>setActiveTab(1)}>Quiz Review</button>
          <button className={activeTab==2 ? "tabButton" : "tabButtonNotActive" } onClick={()=>setActiveTab(2)}>Task Results</button>
          <button className={activeTab==3 ? "tabButton" : "tabButtonNotActive" } onClick={()=>setActiveTab(3)}>Get Help</button>
        </div>
    );
  }

  function renderComp() {
    console.log(props.location.state.submitTask.questionAndAnswers);
    if(activeTab == 1) {
      return(<QuizReview 
        pointsAwarded={props.location.state.submitTask.pointsAwarded}
        pointsTotal={props.location.state.submitTask.pointsPossible}
        // qa={props.location.state.submitTask.questionAndAnswers}
        qa={taskQAs}
      />);
    }
    else if(activeTab == 3) {
      return(<TaskReviewHelp/>);
    }
    else if(activeTab == 2) {
      return(<TaskReviewResults 
        submission = {submission}
      />);
    }
  }

  function getHeader() {
    if(activeTab == 1) {
      return 'QUIZ REVIEW';
    }
    else if(activeTab == 3) {
      return 'GET HELP';
    }
    else if(activeTab == 2) {
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
      <ReviewTabs/>
      { renderComp() }
      { getButtons() }
    </div>
  );
}