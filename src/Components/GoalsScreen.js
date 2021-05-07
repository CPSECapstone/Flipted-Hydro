import { useQuery } from '@apollo/client';
import React, { useState  } from 'react';
import { GET_ALL_GOALS } from '../gqlQueries';
import "./GoalsScreen.css";

//This component is used to display the main part of the goals screen
function GoalsScreen() {

  const {loading, error, data} = useQuery(GET_ALL_GOALS);

  //used to filter goals
  const [searchCategory, setSearchCategory] = useState('');

  const [newGoalOpen, setNewGoalOpen] = useState(false);

  if(loading){
    return <h1>Loading</h1>
  }
  if(error){
    return <h1>Error</h1>
  }

  console.log(data);

  const goals = data.getAllGoals;
  const allCategories = goals.map(goal => goal.category);

  function addGoal (title, category, subGoals) {
    
      // setGoals([...goals, {id: goals.length, title: title, completed: false, favorited: false, dueDate: "00/00/00", category: category, owner: "testuser", assignee: "testuser", open: false, subGoals: subGoals} ]);
      // goals.push({id: goals.length, title: title, completed: false, favorited: false, dueDate: "00/00/00", category: category, owner: "testuser", assignee: "testuser", open: false, subGoals: subGoals});
      // setAllCategories(() =>getAllCategories());
      // setNewGoalOpen(false);  
      console.log('added');
      setNewGoalOpen(false); 
  }

  //dropdown for the list of all available categories
  function DropDown() {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <button type="button" className="dropdownButton" onClick={()=>setOpen(!open)}>{searchCategory == "" ? "v" : searchCategory}</button>
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

  function handleCompleteGoal(goalId, subgoalId) {
    // goals[goalId].subGoals[subgoalId].completed = !goals[goalId].subGoals[subgoalId].completed;
    // setGoals([...goals]);
    console.log('completed');
  }

  function handleStarGoal(goalId) {
    // goals[goalId].favorited = !goals[goalId].favorited;
    // setGoals([...goals]);
    console.log('starred');
  }

  //displays a list of subgoals
  function SubGoalList(props) {
    return props.g.subGoals.map((subg) => (
      <SubGoal key={subg.id} sg={subg} goalId={props.g.id}/>
    ));
  }

  //displays one goal
  function Goal(props){

    const [open, setOpen] = useState(false);

    return(
      <div className="goal">
        <div className="goalGrid">
          <button className="arrowButton" onClick={() => setOpen(!open)}>{props.g.open ? "v" : ">" }</button>
          <h1 >{props.g.title}</h1>
          <button className="checkButton" courseid={props.g.id} onClick={() => handleStarGoal(props.g.id)}>{props.g.favorited ? "⭐" : ""}</button>
        </div>
        {open ? (<SubGoalList g={props.g}/>) : null }
      </div>
    );
  }

  //displays a list of goals
  function StarredGoalList() {
    return goals.filter(({category, favorited}) => {return (category === searchCategory || searchCategory === '') && favorited;}).map((goal) => (
      <Goal key={goal.id} g={goal}/>
    ));
  }

  function UnstarredGoalList() {
    return goals.filter(({category, favorited}) => {return (category === (searchCategory) || searchCategory === '') && !favorited;}).map((goal) => (
      <Goal key={goal.id} g={goal}/>
    ));
  }

  //displays one subgoal
  function SubGoal(props){
    return(
      <div className={props.sg.completed ? "subGoalDone" : "subGoal"}>
        <h1>{props.sg.title}</h1>
        <p>{"due: "+props.sg.dueDate}</p>
        <button className="checkButton" courseid={props.sg.id} onClick={() => handleCompleteGoal(props.goalId, props.sg.id)}>{props.sg.completed ? "✅" : ""}</button>
      </div>
      
    );
  }

  function NewGoalForm() {
    //used by the form as a new goal is built
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [subGoals, setSubGoals] = useState([]);

    //used by the form as a new subgoal is built
    const [subTitle, setSubTitle] = useState('');
    const [subDate, setSubDate] = useState('');

    function handleAddSubgoal() {
      if (subTitle != '' && subDate != '') {
        setSubGoals([...subGoals, {id: subGoals.length, title: subTitle, completed: false, dueDate: subDate}]);
        setSubTitle('');
        setSubDate('');
      }
    }

    function handleAddGoal() {
      if (title != '' && subGoals.length != 0){
        console.log("addgoal is running");
        addGoal(title, category, subGoals);
        setTitle('');
        setCategory('');
        setSubGoals([]);
      }
    }

    return (
        <form data-testid="test2" className="newGoalForm" >
          <h3 >Add Goal</h3>
          <label className="textInput"> Title: </label>
          <input type="text" id="cname" name="cname" value={title} onChange={event => setTitle(event.target.value)}/>
          <br />
          
          <label className="textInput"> Category: </label>
          <input type="text" id="cname" name="cname" value={category} onChange={event => setCategory(event.target.value)}/>
          
          <label className="textInput"> Subgoal: </label>
          <input type="text" id="cname" name="cname" value={subTitle} onChange={event => setSubTitle(event.target.value)}/>
          <label className="textInput"> Due date: </label>
          <input type="text" id="cname" name="cname" value={subDate} onChange={event => setSubDate(event.target.value)}/>
          <button type="button" onClick={handleAddSubgoal}>add subgoal</button>
          

          <div>
            {subGoals.map((subgoal, i)=>(
            <p key={i}>{subgoal.title}</p>
            ))}
          </div>

          <button type="button" className="submitbutton" onClick={handleAddGoal}>Submit</button>
        </form>
    )
  }

  function GoalsDisplay() {
    return (
      <div className="mainContainer">
        <h1 data-testid="test1" className="pageTitle">My Goals</h1>
        <button type="button" className="newGoalButton" onClick={()=>setNewGoalOpen(true)}>New Goal</button>
        <div className="filterBar">
          <h3>Filter by Category:</h3>
          <div>
            <DropDown/>
          </div>
        </div>

        <StarredGoalList/>
        <UnstarredGoalList/>

      </div>
    );
  }

  function NewGoalFormDisplay() {
    return(
      <div className="popupContainer" key="popupcontainer">
        <div className="newGoalForm" key="newgoalform">
          <NewGoalForm key="newform"/>
          <button type="button" onClick={()=>setNewGoalOpen(false)}>close</button>
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

export default GoalsScreen;