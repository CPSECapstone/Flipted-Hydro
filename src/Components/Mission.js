import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_MISSION } from '../gqlQueries.js';
import MTaskOverview from './MTaskOverview.js';
import './Mission.css';

//This component is used to display the mission page.
function Mission() {
  const { loading, error, data } = useQuery(GET_MISSION, {
    variables: { id: "da0719ba103" },
  });

  const [focusedTask, setFocusedTask] = useState(null);

  if(loading) return (
    <h2>Loading...</h2>
  )

  if(error){
    console.error(error);
    return (
      <h2>Error!</h2>
    );
  }

  //check if mission is null
  const title = data.mission.name;
  const description = data.mission.description;

  function displayMissions(data) {
    if (data != null) {
    return data.mission.missionContent.map((missionContentItem) => {
      if (missionContentItem.__typename === 'Task') {
        return renderTask(missionContentItem);
      }
      else if (missionContentItem.__typename === 'SubMission') {
        return renderSubMission(missionContentItem);
      }
    })};
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
            {task.name}
          </ul>
        </div>      
      </div>
    )
  }

  function renderSubMission(subMission){
    return (
    <div key={subMission.id} className={subMission.__typename}>         
        <ul>
          {subMission.name}
        </ul>
      </div>
    )
  }

  return (
    <div> 
      <h1>{title}</h1>
      <h2>{description}</h2>
      <div className="row">        
        <div className="column">      
          <ul>{displayMissions(loading, error, data)}</ul>               
        </div>
        <div className="column">
          {!focusedTask? null: <div className="card">
            <MTaskOverview task={focusedTask}/>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Mission;