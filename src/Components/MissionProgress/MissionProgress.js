import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import '../ProgressOverview.css'
import { GET_ALL_MISSION_PROGRESS, GET_MISSIONS} from '../../gqlQueries.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import './MissionProgress.css';
import mockMissionProgressData from './MockMissionProgressData.js'
import MissionProgressDetails from './MissionProgressDetails.js'

export default function MissionProgress() {
      
    //used to keep track of if the mission details should be visible
    const [focusedMission, setFocusedMission] = useState(null);
    
    //Query mission data for the specified course
    const { loading, error, data, refetch} = useQuery(GET_MISSIONS, {
      variables: { id: "Integrated Science" },
    });
      
    //Query Mission Progress Data (not currently user - using hard coded data above)
    const { loading: progressLoading, error: progressError, data: progressData, refetch : progressRefetch} = useQuery(GET_ALL_MISSION_PROGRESS, {
        variables: { id: "Integrated Science" }
    });
      
    if(loading || progressLoading) return (<h2>Loading...</h2>);
    
    if(error || progressError){
        console.log(error);
        return (<h2>Error!</h2>);
    }

    //returns a percentage of tasks in the specified mission that have been submitted
    //this is not currently used, but it will be once the backend returns real data
    function calculateMissionProgress(missionId, progressData){

        var progress = getProgress(missionId, progressData);

        //progress object not found
        if (progress == null){
            console.warn("Mission progress not found.");
            return 0;
        } 

        progress = progress.progress;//this is getting ridiculous :-)

        //calculate percentage of tasks completed
        var completedCount = 0;
        var nTasks = progress.length;
        for(var i = 0; i < nTasks; i++){
            if (progress[i].submission != null) completedCount++;
        }
        return 100 * completedCount/nTasks;
    }

    //Used to select which Mission Progress information should be shared
    function changeFocusedMission(mission){
        setFocusedMission(mission);
    }
    
    //Display all missions
    function displayMissions(data) {
        return data.missions.map((mission) => {
            return (
            <div style={{"padding-bottom":"10em"}} onClick={() => changeFocusedMission(mission)}>
                <CircularProgress style={{transform: "scale(5, 5) translate(20%, 0%) ", color: "#E0E0E0"}} variant="determinate" value={100} /> 

                <CircularProgress 
                    style={{transform: "scale(5, 5) rotate(-90deg)", color: "#4274F3" }} 
                    variant="determinate" 
                    value={calculateMissionProgress(mission.id, progressData)} 
                /> 
                <h1 style={{color: "black", fontFamily: "\"Poppins\", sans-serif",  transform: "translate(20%, -90%)", fontSize: "16px", width: "70px", height: "40px" }}>{mission.name}</h1>
            </div>
            )        
        });
    }

    //retrieve the progress object that matches the specified missionId
    function getProgress(missionId, progressData) {
        
        var progress = null;
        for (var i = 0; i < progressData.getAllMissionProgress.length; i++){
            if (progressData.getAllMissionProgress[i].mission.id == missionId) {
                progress = progressData.getAllMissionProgress[i];
            }
        }

        return progress;
    }

    function allMissions() {
        return(
            <div style={{width: "80%", margin: "auto", "margin-top": "10em"}}>
                <div className="row">
                    <div className="column" style={{display: "grid", "grid-template-columns": "1fr 1fr 1fr", "justify-items": "center"}}>
                        {displayMissions(data)}
                    </div>
                </div>
            </div>
        );
    }

    function getFocusedMissionProgress(){
        return progressData.getAllMissionProgress.filter(progressItem => 
            progressItem.mission.id == focusedMission?.id    
        )[0]
    }

    return (focusedMission!=null ? 
        (<MissionProgressDetails 
            missionData={data} 
            missionProgress={getFocusedMissionProgress()} 
            closeCallback={() => setFocusedMission(null) } 
            displayMissions={displayMissions}/>) 
        : allMissions()
    );
}
