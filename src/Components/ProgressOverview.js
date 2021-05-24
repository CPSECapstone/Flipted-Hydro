import { useQuery} from '@apollo/client';
import React, { useState } from 'react';
import ProgressBar from './ProgressBar.js'
import './ProgressOverview.css'
import { GET_ALL_MISSION_PROGRESS, GET_MISSIONS, GET_ALL_TARGET_PROGRESS, GET_TARGETS } from '../gqlQueries.js';
import MissionProgress from './MissionProgress.js'

//This component is used to display the Student Progress Overview.
function ProgressOverview() {
  

//----------- Mastery Progress (Learning Targets)----------
// if(targetLoad) return (
//   <h2>Loading...</h2>
// )

// if(targetError){
//   console.log(targetError);
//   return (
//     <h2>Error!</h2>
//   );
// }

// if(tpLoad) return (
//   <h2>Loading...</h2>
// )

// if(tpError){
//   console.log(tpError);
//   return (
//     <h2>Error!</h2>
//   );
// }

// function changeFocusedTarget(target){
//   console.log(focusedTarget);
//   setFocusedTarget({
//     targetId: target.targetId,
//     targetName: target.targetName
//   })
// }

// function displayTargets(data) {
//   return data.targets.map((target) => {
//     return (
//       <div key={target.targetId} className="mission" onClick={() => changeFocusedTarget(target)}>
//         <ul>
//           {target.targetName}
//         </ul>
//       </div>
//     )        
//   });
// }

// function displayObjectives(data) {
//   return (
//     data.getAllTargetProgress.map((targetItem) => {

//       return (
//         targetItem.objectives.map((objective) => {
//           return (
//             <div key={objective.objectiveId} >
//               <ul>
//                 {objective.objectiveName}
//               </ul>
//             </div>
//           )
//         })
//       )
//     })    
//   )
// }

// return (
//     <div>
//         <h1>Missions Progress</h1>
//         <div className="row">
//           <div className="column">
//             <ul style={styling}>
//               {displayMissions(data)}
//             </ul>
//           </div>
//         </div>
//         <div className="row">
//           <div className="column">
//             {!focusedMission? null: 
//               <div>
//                 {calculateMissionProgress(focusedMission, missionProgress)}
//               </div>}
//           </div>
//         </div>
//         <h1>Mastery Progress</h1>
//         <div className="row">
//           <div className="column">
//             <ul style={styling}>
//               {displayTargets(targetData)}
//             </ul>
//           </div>
//         </div>
//         <div className="row">
//           <div className="column">
//             {!focusedTarget? null: 
//               <div className="card">
//                 <ul>
//                   {displayObjectives(tpData)}
//                 </ul>
//               </div>
//             }
//           </div>
//         </div>                           
//     </div>
//   );
  return(
    <MissionProgress/>
  );
}

export default ProgressOverview;