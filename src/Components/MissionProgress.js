import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import ProgressBar from './ProgressBar.js'
import './ProgressOverview.css'
import { GET_ALL_MISSION_PROGRESS, GET_MISSIONS} from '../gqlQueries.js';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function MissionProgress() {
      
    const styling = {
    'display' : "flex"
    };
    
    const [focusedMission, setFocusedMission] = useState(null);
    
    const { loading, error, data, refetch} = useQuery(GET_MISSIONS, {
    variables: { id: "Integrated Science" },
    });
      
    //Query Mission Progress Data (not currently user - using hard coded data above)
    const { loading: progressLoading, error: progressError, data: progressData, refetch : progressRefetch} = useQuery(GET_ALL_MISSION_PROGRESS, {
        variables: { id: " " }
    });
      
    //   const [focusedTarget, setFocusedTarget] = useState(null);
      
      if(loading) return (
        <h2>Loading...</h2>
      );
      
      if(error){
        console.log(error);
        return (
          <h2>Error!</h2>
        );
      }
      
      if(progressLoading) return (
        <h2>Loading...</h2>
      );
      
      if(progressError){
        console.log(progressError);
        return (
          <h2>Error!</h2>
        );
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
            // <div key={mission.id} className="mission" onClick={() => changeFocusedMission(mission)}>
            //   <ul>
            //     {mission.name}
            //   </ul>
            // </div>
            <div>
                <div style={{height: "0", width: "0" }} ><CircularProgress style={{transform: "scale(-5, 5)", color: "#4274F3" }} variant="determinate" value={75} /> </div>
                <h1 style={{padding:"5em" }}>test</h1>
            </div>
          )        
        });
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
                 {calculateMissionProgress(focusedMission, progressData)}
               </div>}
           </div>
         </div>
        </div>
    )
}
