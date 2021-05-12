import { GET_MISSIONS } from '../gqlQueries.js';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import './MissionsScreen.css';
import EcoIcon from '@material-ui/icons/Eco';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import HdrWeakIcon from '@material-ui/icons/HdrWeak';
import ProgressBar from './ProgressBar.js';

const MISSION_COMPONENT_PATH = "/mission";

export default function MissionsScreen() {

    const { loading, error, data, refetch} = useQuery(GET_MISSIONS, {
        variables: { id: "Integrated Science" },
    });

    const fakedata = {missions: [
      {name: "FakeMission1", description: "this is the 1st fake mission", id: 1},
      {name: "FakeMission2", description: "this is the 2nd fake mission", id: 2},
      {name: "FakeMission3", description: "this is the 3rd fake mission", id: 3},
    ]}

    const hist = useHistory();
    const [focusedMission, setFocusedMission] = useState(null);

    function displayMissionList(){
        console.log("data");
        console.log(data);
        return (<div className="missionList"> 
          {fakedata.missions.map((mission) => (
            <div className="Mission" onClick={()=>setFocusedMission(mission)}>
              <HdrWeakIcon style={{ color: "white", transform: "scale(6)" }}/>
              {/* <h1 style={{size: "10px", color: "white"}}>{mission.name}</h1> */}
            </div>))} 
        </div>);
    }

    function MissionOverview(props) {
      if (props.mission != null)
        return (
          <div>
            <h1>{props.mission.name}</h1>
            <h2>{props.mission.description}</h2>
            <div className="progress">
            <div></div>
            <ProgressBar 
              width='700'
              height='10'
              doneColor='#4274F3'
              leftColor='rgb(108, 108, 133)'
              total={10}
              done={7}
            />
            <h1 style={{"font-size": "18px", margin: "0", padding: "0", align: "center", "padding-bottom": "20px"}}>70% Complete</h1>
            </div>
            <div className="start">
              <button style={{top: "0"}}onClick={()=>redirectToMission(props.mission.id)}>Continue</button>
            </div>
          </div>
        );
      else return null;
    }

    function redirectToMission(missionId){
      hist.push({
        pathname: MISSION_COMPONENT_PATH,
        state: {
          id: missionId
        }
      });
    }

    if(loading) return (
      <div className = 'tasks'> 
        <h1>Loading...</h1>
      </div>
    )

    if(error){
      console.log(error);
      //throw error;
      return (
        <div className = 'tasks'> 
          <h1>Error!</h1>
        </div>
      );
    }

    return (
        <div className="missions">
          <h1 style={{"font-size": "40px", "margin-top": "1em", "margin-bottom": "1em"}}>Integrated Science</h1>
          <h2>Missions</h2>
            {displayMissionList()}
            {!focusedMission ? null : 
              (<div className="card">
                <MissionOverview mission={focusedMission}/>
              </div>)
            }
        </div>
    )
}
