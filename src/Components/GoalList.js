import { useQuery, useMutation } from '@apollo/client';
import React, { useState  } from 'react';
import { GET_ALL_GOALS, EDIT_OR_CREATE_GOAL } from '../gqlQueries';
import "./GoalsScreen.css";
import Goal from './Goal';

//This component is used to display the main part of the goals screen
function GoalsScreen() {

  const {loading, error, data, refetch} = useQuery(GET_ALL_GOALS);

  //used to filter goals
  const [searchCategory, setSearchCategory] = useState('');

  const [newGoalOpen, setNewGoalOpen] = useState(false);

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

 

  //displays a list of goals
  function StarredGoalList() {
    return goals.filter(({category, favorited}) => {return (category === searchCategory || searchCategory === '') && favorited;}).map((goal) => (
      <Goal key={goal.id} goal={goal}/>
    ));
  }

  function UnstarredGoalList() {
    return goals.filter(({category, favorited}) => {return (category === (searchCategory) || searchCategory === '') && !favorited;}).map((goal) => (
      <Goal key={goal.id} goal={goal}/>
    ));
  }

  function NewGoalForm() {
    //used by the form as a new goal is built
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [subGoals, setSubGoals] = useState([]);
    const [dueDate, setDueDate] = useState('');

    //used by the form as a new subgoal is built
    const [subTitle, setSubTitle] = useState('');
    const [subDate, setSubDate] = useState('');
    const [createGoal] = useMutation(EDIT_OR_CREATE_GOAL);

    function submitNewGoal (title, dueDate, category, subGoals) { 
  
      createGoal({
        variables: {
          goalInput: {
            title: title,
            dueDate: dueDate,
            completed: false,
            subGoals: subGoals,
            category: category,
            favorited: false
          }
        }
      }).then(response => {
        refetch();
      });
        setNewGoalOpen(false); 
    }

    function handleAddSubgoal() {
      if (subTitle != '' && subDate != '') {
        setSubGoals([...subGoals, {title: subTitle, completed: false, dueDate: subDate}]);
        setSubTitle('');
        setSubDate('');
      }
    }

    function handleAddGoal() {
      if (title != '' && dueDate != '' && subGoals.length != 0){
        submitNewGoal(title, dueDate, category, subGoals);
        setTitle('');
        setCategory('');
        setDueDate('');
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

          <label className="textInput"> Due Date: </label>
          <input type="text" id="cname" name="cname" value={dueDate} onChange={event => setDueDate(event.target.value)}/>
          
          <label className="textInput"> Subgoal: </label>
          <input type="text" id="cname" name="cname" value={subTitle} onChange={event => setSubTitle(event.target.value)}/>

          <label className="textInput"> Subgoal Due date: </label>
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