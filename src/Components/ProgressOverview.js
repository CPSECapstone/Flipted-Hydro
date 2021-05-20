import { useQuery} from '@apollo/client';
import React, { useState } from 'react';
import ProgressBar from './ProgressBar.js'
import './ProgressOverview.css'
import { GET_ALL_MISSION_PROGRESS, GET_MISSIONS, GET_ALL_TARGET_PROGRESS, GET_TARGETS } from '../gqlQueries.js';

//This component is used to display the Student Progress Overview.
function ProgressOverview() {
  const missionProgress = {
  "getAllMissionProgress": [
    {
      "mission": {
        "id": "da0719ba103",
        "name": "Chemical Bonds"
      },
      "progress": [
        {
          "taskId": "TASK#1",
          "name": "Mock task 1",
          "submission": {
            "graded": true
          }
        },
        {
          "taskId": "TASK#2",
          "name": "Mock Task 2",
          "submission": {
            "graded": true
          }
        },
        {
          "taskId": "TASK#2",
          "name": "Mock Task 3: Submitted yet not graded",
          "submission": {
            "graded": false
          }
        },
        {
          "taskId": "TASK#2",
          "name": "Mock Task 4: No Submission",
          "submission": null
        }
      ],
      "student": "MOCKUSER_123"
    }
  ]
}

const styling = {
  'display' : "flex"
}

const [focusedMission, setFocusedMission] = useState(null);
const [focusedTarget, setFocusedTarget] = useState(null);

//Query Mission Data
const { loading, error, data, refetch} = useQuery(GET_MISSIONS, {
  variables: { id: "Integrated Science" }
});

//Query Mission Progress Data
const { loading: progressLoading, error: progressError, data: progressData, refetch : progressRefetch} = useQuery(GET_ALL_MISSION_PROGRESS, {
  variables: { id: " " }
});

//Query Target Data
const { loading: targetLoad, error: targetError, data: targetData, refetch: targetRefecth} = useQuery(GET_TARGETS, {
  variables: {id: "Integrated Science"}
});

//Query Target Progress Data
const { loading: tpLoad, error: tpError, data: tpData, refetch: tpRefecth} = useQuery(GET_ALL_TARGET_PROGRESS, {
  variables: {id: "Integrated Science"}
});

if(progressLoading) return (
  <h2>Loading...</h2>
)

if(progressError){
  console.log(progressError);
  return (
    <h2>Error!</h2>
  );
}

if(loading) return (
  <h2>Loading...</h2>
)

if(error){
  console.log(error);
  return (
    <h2>Error!</h2>
  );
}

if(targetLoad) return (
  <h2>Loading...</h2>
)

if(targetError){
  console.log(targetError);
  return (
    <h2>Error!</h2>
  );
}

function displayTasks(progressArray) {
  return progressArray.map((task) => {
    return (
      <div key={task.id}>
        <ul>
          {task.name}
        </ul>
      </div>
    )        
  });
}

function calculateMissionProgress(mission, progressData){
  //retrieve the progress object that matches the specified missionId
  var progress = null;
  for (var i = 0; i < progressData.getAllMissionProgress.length; i++){
    if (progressData.getAllMissionProgress[i].mission.id == mission.id) {
      progress = progressData.getAllMissionProgress[i].progress;
    }
  }
  //progress object not found
  if (progress == null){
    console.warn("Mission progress not found.");
    return(
      <div className="card">
        <h1>No data found!</h1>
      </div>
    );
  } 
  //calculate percentage of tasks completed
  var completedCount = 0;
  var nTasks = progress.length;
  for(var i = 0; i < nTasks; i++){
    if (progress[i].submission != null) completedCount++;
  }

  return (
    <div className="card">
      <h1>Tasks Completion</h1>
      <h2>{mission.name}</h2>
      <div>
        <ProgressBar
          width='400'
          height='10'
          doneColor='#4274F3'
          leftColor='rgb(108, 108, 133)'
          total={nTasks}
          done={completedCount}
        />
      </div>
      <h2>{completedCount} tasks completed of {nTasks}</h2>
      <ul>
        <h2>{displayTasks(progress)}</h2>
      </ul>
    </div>
  )
}

//Used to select which Mission Progress information should be shared
function changeFocusedMission(mission){
  console.log(focusedMission);
  setFocusedMission({
    id: mission.id,
    name: mission.name,
    description: mission.description
  })
}

//Display all missions
function displayMissions(data) {
  return data.missions.map((mission) => {
    return (
      <div key={mission.id} className="mission" onClick={() => changeFocusedMission(mission)}>
        <ul>
          {mission.name}
        </ul>
      </div>
    )        
  });
}

function displayTargets(data) {
  return data.targets.map((target) => {
    return (
      <div key={target.targetId} className="mission" onClick={() => changeFocusedTarget(target)}>
        <ul>
          {target.targetName}
        </ul>
      </div>
    )        
  });
}

function displayObjectives(data) {
  return (
    data.getAllTargetProgress.map((targetItem) => {

    return (
    targetItem.objectives.map((objective) => {
      return (
        <div key={objective.objectiveId} >
          <ul>
            {objective.objectiveName}
          </ul>
        </div>
      )
    })
    )
  })   
     
  )
}

function changeFocusedTarget(target){
  console.log(focusedTarget);
  setFocusedTarget({
    targetId: target.targetId,
    targetName: target.targetName
  })

}

return (
    <div>
        <h1>Missions Progress</h1>
        <div className="row">
          <div className="column">
            <ul style={styling}>
              {displayMissions(data)}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="column">
            {!focusedMission? null: 
              <div>
                {calculateMissionProgress(focusedMission, missionProgress)}
              </div>}
          </div>
        </div>
        <h1>Mastery Progress</h1>
        <div className="row">
          <div className="column">
            <ul style={styling}>
              {displayTargets(targetData)}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="column">
            {!focusedTarget? null: 
            <div className="card">
              <ul>
                {displayObjectives(tpData)}
              </ul>
              </div>
            }
          </div>
        </div>                           
    </div>
  );
}

export default ProgressOverview;