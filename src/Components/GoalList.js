import { useQuery, useMutation } from '@apollo/client';
import React, { useState  } from 'react';
import { GET_ALL_GOALS } from '../gqlQueries';
import "./GoalsScreen.css";
import Goal from './Goal';
import GoalForm from './GoalForm';

import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Button from '@material-ui/core/Button';

//This component is used to display the main part of the goals screen
function GoalList() {

  const {loading, error, data, refetch} = useQuery(GET_ALL_GOALS);

  //used to filter goals
  const [searchCategory, setSearchCategory] = useState('');

  const [newGoalOpen, setNewGoalOpen] = useState(false);

  const [currentGoal, setCurrentGoal] = useState(null);

  if(loading){
    return <h1>Loading</h1>
  }
  if(error){
    return <h1>Error</h1>
  }

  const goals = data.getAllGoals;
  const allCategories = goals.map(goal => goal.category);

  //dropdown for the list of all available categories
  function DropDown() {
    const [open, setOpen] = useState(false);

    const filterButtonStyle = {
      "color": "#4274F3",
      "width": "100%",
      "fontSize": "16px",
      "textTransform": "none",
      "fontWeight": "bold"
    }

    return (
      <div>
        <Button style={filterButtonStyle} onClick={()=>setOpen(!open)}>Filter By Category</Button>
        <br/>
        {open ? (<DisplayDropDownList/>) : null}
      </div>);
  }

  function DisplayDropDownList(){
    return(
      <div>
        {allCategories.map((category, i)=>(
        <button type="button" className="dropdownItem" key={i} onClick={()=>setSearchCategory(category)}>{category}</button>
        ))}
        <button type="button" className="clearCategoryItem" onClick={()=>setSearchCategory('')}>clear</button>
      </div>
    )
  }

  const editGoalCallback = (goal) => {
    setCurrentGoal(goal);
    setNewGoalOpen(true);
  }

  //displays a list of goals
  function StarredGoalList() {
    return (
      goals.filter(({category, favorited}) => {return (category === searchCategory || searchCategory === '') && favorited;})
        .map((goal) => (<div key={goal.id} data-testid={"starredGoal"}><Goal goal={goal} editGoalCallback={editGoalCallback}/></div>))
    );
  }

  function UnstarredGoalList() {
    return (
      goals.filter(({category, favorited}) => {return (category === (searchCategory) || searchCategory === '') && !favorited;})
      .map((goal) => (<div key={goal.id} data-testid={"unStarredGoal"}><Goal goal={goal} editGoalCallback={editGoalCallback}/></div>))
    );
  }

  

  function GoalsDisplay() {
    return (
      <div className="mainContainer">
        <div/>
        <div>
          <h1 data-testid="test1" className="pageTitle">My Goals</h1>
          
          <div className="goalBoxContainter">
            <div className="filterBar">
                            
              <div>
                <DropDown/>
              </div>
              
              <IconButton data-testid="addGoalButton" aria-label="complete subgoal" component="span"
                onClick={()=>setNewGoalOpen(true)} style={{color: "#4274F3"}}>
                    <AddCircleOutlinedIcon/>
              </IconButton>
                
            </div>

            <StarredGoalList/>
            <UnstarredGoalList/>

          </div>

        </div>
        <div/>
      </div>
    );
  }

  function closeGoalForm(){
    refetch();
    setNewGoalOpen(false);
    setCurrentGoal(null);
  }

  function NewGoalFormDisplay() {
    return(
      <div className="popupContainer" key="popupcontainer">
        <div className="newGoalForm" key="newgoalform">
          <GoalForm key="newform" goal={currentGoal}/>
          <button type="button" onClick={closeGoalForm}>close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mainGoalsPage" key="maingoalspage" >   
      {newGoalOpen ? (<NewGoalFormDisplay key="form"/>) : (<GoalsDisplay key="goals"/>)}
    </div>
  );
}

export default GoalList;