import { useQuery} from '@apollo/client';
import React, { useState } from 'react';
import { GET_MISSION } from '../gqlQueries.js';
import MTaskOverview from './MTaskOverview.js';
import './Mission.css';

//This component is used to display the mission page.
function Mission(props) {

  const missionId = props?.location?.state?.id;

  const { loading, error, data} = useQuery(GET_MISSION, {
    variables: { id: missionId },
  });

  const [focusedTask, setFocusedTask] = useState(null);

  if(loading) return (
    <h2>Loading...</h2>
  )

  if(error){
    console.log(error);
    return (
      <h2>Error!</h2>
    );
  }

  const title = data.mission.name;
  const description = data.mission.description;

  function displayMissions(loading, error, data) {
    return data.mission.missionContent.map((missionContentItem) => {
      if (missionContentItem.__typename === 'Task') {
        return renderTask(missionContentItem);
      }
      else if (missionContentItem.__typename === 'SubMission') {
        return renderSubMission(missionContentItem);
      }
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

  function renderTask(task){
    return (
      <div>        
        <div key={task.id} className={task.__typename} onClick={() => changeFocusedTask(task)}>         
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