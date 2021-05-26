import React, { useState } from 'react';
import './ProgressOverview.css'
import MissionProgress from './MissionProgress/MissionProgress.js'
import MasteryProgress from './MasteryProgress/MasteryProgress.js'

//This component is used to display the Student Progress Overview.
function ProgressOverview() {
  const [activeTab, setActiveTab] = React.useState(1);

  function ProgressTabs() {
    return (
        <div className="tabButtonContainer">
          <button className={activeTab==1 ? "tabButton" : "tabButtonNotActive" } onClick={()=>setActiveTab(1)}>Missions</button>
          <button className={activeTab==2 ? "tabButton" : "tabButtonNotActive" } onClick={()=>setActiveTab(2)}>Learning Targets</button>
        </div>
    );
  }

  return(
    <div>
      <div style={{display: "grid", "grid-template-columns": "1fr 1fr", "margin-top": "5em", "justify-items": "center", "align-items": "center"}}>
        <h1>{activeTab==1 ? "Missions Progress" : "Mastery Progress"}</h1>
        <ProgressTabs/>
      </div>

      <hr style={{color: "#2F80ED", width: "65%", margin: "auto"}}/>
      
      {activeTab==1 ? <MissionProgress/> : <MasteryProgress/>}
    </div>
    
  );
}

export default ProgressOverview;