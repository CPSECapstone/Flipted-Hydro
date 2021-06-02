import React from 'react';
import { useHistory } from 'react-router';
import './TaskOverview.css';

const TASK_COMPONENT_PATH = "/task";

function MTaskOverview(props) {

  const hist = useHistory();

  if(!props.task){
    return <div></div>;
  }
    
  const mapRequirementsToCheck = (req) => {
    if(!req) return [];
    return req.map(({description,id}) => (
      <div key={id}>
        <h4>{description}</h4>
      </div>))
  }

  function changeToTaskScreen(taskId){
    console.log(taskId);
    hist.push({
      pathname:TASK_COMPONENT_PATH,
      state: {
        id: taskId
      }
    });
  }

   return (
      <div>
         <h1>{props.task.name}</h1>
         <div className="line"></div>
         <h3>Task Description:</h3>
         <h4>{props.task.instructions}</h4>
         <h4>Points: {props.task.points}</h4>
         <h4>Due: {props.task.dueDate}</h4>
         <div className="line"></div>
         <h3>Mastery Requirements:</h3>
         <h2>{mapRequirementsToCheck(props.task.requirements)}</h2>
         <div  className="start">
         <button onClick={() => changeToTaskScreen(props.task.id)}>Start</button>
         </div>
      </div>
   );
}

export default MTaskOverview;