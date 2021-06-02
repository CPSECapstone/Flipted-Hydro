import { useQuery} from '@apollo/client';
import React, { useState } from 'react';
import { GET_MISSION, GET_ALL_MISSION_PROGRESS } from '../gqlQueries.js';
import MTaskOverview from './MTaskOverview.js';
import './Mission.css';
import BACK from './Images/Vector.png';

function getMissionProgress(missionId, allProgressData){
  return allProgressData.getAllMissionProgress.filter(progress => 
    progress.mission.id == missionId  
  )[0]
}

//This component is used to display the mission page.
function Mission(props) {

  const missionId = props?.location?.state?.id;

  const { loading, error, data} = useQuery(GET_MISSION, {
    variables: { id: missionId },
  });

  const { loading: progressLoading, error: progressError, data: allProgressData, refetch : progressRefetch} = useQuery(GET_ALL_MISSION_PROGRESS, {
    variables: { id: "Integrated Science" },
  });

  const [focusedTask, setFocusedTask] = useState(null);

  if(loading || progressLoading) return (
    <h2>Loading...</h2>
  )

  if(error || progressError){
    return (
      <h2>Error!</h2>
    );
  }

  const title = data.mission.name;
  const description = data.mission.description;
  const progress = getMissionProgress(missionId, allProgressData)?.progress;

  console.log(progress);

  function displayMissions(loading, error, data) {
    return data.mission.missionContent.map((missionContentItem) => {
      if (missionContentItem.__typename === 'Task') {
        return renderTask(missionContentItem);
      }
      // else if (missionContentItem.__typename === 'SubMission') {
      //   return renderSubMission(missionContentItem);
      // }
    });
  }

  function changeFocusedTask(task){
    console.log(focusedTask);
    setFocusedTask({
      id: task.id,
      name: task.name,
      instructions: task.instructions,
      points: task.points,
      dueDate: task.dueDate,
      requirements: task.requirements
    })
  }

  function taskCompleted(task){
    const taskProgress = progress?.filter(item => 
      item.taskId == task.id  
    )[0]
    return taskProgress && taskProgress.submission;
  }

  function getTaskStyle(task){
    if(taskCompleted(task)){
      return {}
    }
    return {
      background: "white"
    };
  }

  function renderTask(task){
    return (
      <div>        
        <div key={task.id} className={task.__typename} style={getTaskStyle(task)}
          onClick={() => changeFocusedTask(task)}>         
          <ul>        
            <h5>{task.name}</h5>
            <h2>Points: {task.points}</h2>
          </ul>
        </div>      
      </div>
    )
  }

  function renderSubMission(subMission){
    return (
    <div key={subMission.id} className={subMission.__typename}>         
        <ul>
          <h2>Sub-Mission:</h2>
          <h5>{subMission.name}</h5>
          
        </ul>
      </div>
    )
  }

  return (
    <div className="MissonOverview"> 
      <div className="background"> 
        <div className="missionTitle"></div>
          <div className="missiontext">
            <h1>{title}</h1>
            <h2>{description}</h2>
          </div>
        <div className="row">        
          <div className="column">  
            <div className="taskSpace">
              <ul>{displayMissions(loading, error, data)}</ul>                         
            </div>  
          </div>
          
            <div className="preview">
              <MTaskOverview task={focusedTask}/>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default Mission;

/*
<div className="row">        
        <div className="column">  
          <div className="taskSpace">
          <ul>{displayMissions(loading, error, data)}</ul>                         
          </div>  
        </div>
        <div className="column">
          <div className="card">
            <MTaskOverview task={focusedTask}/>
          </div>}
        </div>
      </div>
*/