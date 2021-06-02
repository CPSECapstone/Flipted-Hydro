import { GET_MISSIONS, GET_ALL_MISSION_PROGRESS } from '../gqlQueries.js';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useHistory } from 'react-router';
import './MissionsScreen.css';
import HdrWeakIcon from '@material-ui/icons/HdrWeak';
import ProgressBar from './ProgressBar.js';

const MISSION_COMPONENT_PATH = "/mission";

//this component displays all of the Missions in a course
export default function MissionsScreen() {

    const hist = useHistory();

    const [focusedMission, setFocusedMission] = useState(null);

    const { loading, error, data, refetch} = useQuery(GET_MISSIONS, {
        variables: { id: "Integrated Science" },
    });

    const { loading: progressLoading, error: progressError, data: progressData, refetch : progressRefetch} = useQuery(GET_ALL_MISSION_PROGRESS, {
      variables: { id: "Integrated Science" },
    });

    if(loading || progressLoading) return (
      <div className = 'tasks'> 
        <h1>Loading...</h1>
      </div>
    )

    if(error || progressError){
      console.warn(error);
      //throw error;
      return (
        <div className = 'tasks'> 
          <h1>Error!</h1>
        </div>
      );
    }

    return MissionsScreenDisplay(data, progressData, hist, focusedMission, setFocusedMission);
}

//this function allows for dependency injection during testing
export function MissionsScreenDisplay(data, progressData, hist, focusedMission, setFocusedMission) {

  function displayMissionList(){
      return (<div className="missionList"> 
        {data.missions.map((mission) => (
          <div data-testid={mission.id} className="Mission" onClick={()=>setFocusedMission(mission)}>
            {/* <HdrWeakIcon style={{ color: "white", transform: "scale(6)" }}/> */}
            <h1 style={{size: "10px", color: "white"}}>{mission.name}</h1>
          </div>))} 
      </div>);
  }

  function MissionOverview(props) {

    if (props.mission != null){
      var prog = calculateMissionProgress(props.mission.id, progressData);
      return (
        <div className="previewCard">
        <div data-testid="missionOverview">
          <h1 style={{"margin-top": "3em"}}>{props.mission.name}</h1>
          <h2 style={{margin: "auto", width: "80%", "margin-bottom": "1em"}}>{props.mission.description}</h2>
          <div></div>
          <div data-testid="missionOverviewProgressBar">  
            <ProgressBar 
              width='400'
              height='10'
              doneColor='#4274F3'
              leftColor='rgb(108, 108, 133)'
              total={100}
              done={prog}
            />
          </div>
          <h1 style={{"font-size": "18px", margin: "auto", padding: "0", align: "center"}}>{Math.round(prog)}% Complete</h1>
          <div className="start">
            <button data-testid="redirectToMissionButton" style={{top: "0", "margin-top": "5em"}}onClick={()=>redirectToMission(hist, props.mission.id)}>Continue</button>
          </div>
        </div>
        </div>
      );
    }
    else return null;
  }

  return (
    <div style={{display: "flex"}}>
      <div className="column">
      <h1 data-testid="courseTitle" style={{"font-size": "40px", "margin-top": "2em", "margin-bottom": "2em", width: "auto"}}>Integrated Science</h1>
      <h2>Missions</h2>
      {displayMissionList()}
      </div>
      {!focusedMission ? null : (<MissionOverview mission={focusedMission} />)}
    </div>
  )
}

//returns a percentage of tasks in the specified mission that have been submitted
export function calculateMissionProgress(missionId, progressData){

  //retrieve the progress object that matches the specified missionId
  var progress = null;
  for (var i = 0; i < progressData.getAllMissionProgress.length; i++){
    if (progressData.getAllMissionProgress[i].mission.id == missionId) {
      progress = progressData.getAllMissionProgress[i].progress;
    }
  }

  //progress object not found
  if (progress == null){
    console.warn("Mission progress not found.");
    return 0;
  } 

  //calculate percentage of tasks completed
  var completedCount = 0;
  var nTasks = progress.length;
  for(var i = 0; i < nTasks; i++){
    if (progress[i].submission != null) completedCount++;
  }
  if (nTasks > 0)
    return 100 * completedCount/nTasks;
  else 
    return 0;
}

export function redirectToMission(hist, missionId){
  hist.push({
    pathname: MISSION_COMPONENT_PATH,
    state: {
      id: missionId
    }
  });
}