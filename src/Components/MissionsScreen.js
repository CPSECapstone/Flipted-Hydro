import { GET_MISSIONS } from '../gqlQueries.js';
import { useQuery } from '@apollo/client';


export default function MissionsScreen() {
    const { loading, error, data, refetch} = useQuery(GET_MISSIONS, {
        variables: { id: "Integrated Science" },
    });

    function displayMissionList(){
        console.log("data");
        console.log(data);
       return data.missions.map((mission) => (<h1>{mission.name}</h1>));
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
        <div>
            {displayMissionList()}
        </div>
    )
}
