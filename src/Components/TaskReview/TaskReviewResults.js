import React from 'react';
import TaskReviewStats from './TaskReviewStats.js';
import './TaskReviewResults.css';
import { GET_TASK_OBJECTIVES } from '../../gqlQueries.js';
import { useQuery} from '@apollo/client';
import { MASTERY_TAG } from '../MasteryProgress/MasteryLabel.js';

export default function TaskReviewResults(props) {

  const { loading, error, data } = useQuery(GET_TASK_OBJECTIVES, {
    variables: { id: props?.task?.id },
  });

  const submission = props?.submission;
  const mockObjectives = [
    "Learning Objective 1",
    "Learning Objective 2",
    "Learning Objective 3",
    "Learning Objective 4",
  ]

  const mapObjectives = (req) => {
    if (!req) return [];
    return req.map(({ description, id }) => (
      <div key={id}>
        <input type="string" value="A1" id="A1" checked={true} />
        <label for="A1">{description}</label>
      </div>))
  }

  function getObjectiveColor(mastery){
    if(mastery == MASTERY_TAG.NOT_GRADED) return '#E0E0E0';
    if(mastery == MASTERY_TAG.NOT_MASTERED) return '#EA6868';
    if(mastery == MASTERY_TAG.NEARLY_MASTERED) return '#F2C94C';
    if(mastery == MASTERY_TAG.MASTERED) return '#30CC30';
  }

  const objectiveContainerStyle = {
    display: "flex",
    justifyContent: "center"
  }

  function renderObjectives(){
    if(loading){
      return (<h2>Loading...</h2>)
    }
    if(error){
      return (<h2>Error</h2>)
    }

    const objectives = data.getTaskObjectiveProgress;

    return objectives.map((objProgress, index) => {
      
      const objectiveStyle = {
        backgroundColor: getObjectiveColor(objProgress.mastery),
        padding: "1em",
        borderRadius: "1em",
        color: '#18191F'
      }

      return (
        <div key={index} style={objectiveContainerStyle}>
          <h2 style={objectiveStyle}>{"Learning Objective " + objProgress.objective.objectiveName}</h2>
        </div>
      );
    })
  }

  return (
    <div className="row" style={{ margin: "4em" }}>
      <div className="column"></div>
      <div className="column">
        <div className="stat-box">
          <TaskReviewStats submission={submission} />
        </div>
      </div>
      <div className="column">
        <div className="objective-column">
          <h1>Learning Objectives</h1>
          {renderObjectives()}
        </div>
      </div>
    </div>
  );
}
