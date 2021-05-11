import { useMutation } from '@apollo/client';
import React, { useState  } from 'react';
import { EDIT_OR_CREATE_GOAL } from '../gqlQueries';
import "./GoalsScreen.css";

function GoalForm() {
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
    })
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
        <br />

        <label className="textInput"> Due Date: </label>
        <input type="text" id="cname" name="cname" value={dueDate} onChange={event => setDueDate(event.target.value)}/>
        <br />

        <label className="textInput"> Subgoal: </label>
        <input type="text" id="cname" name="cname" value={subTitle} onChange={event => setSubTitle(event.target.value)}/>
        <br />

        <label className="textInput"> Subgoal Due date: </label>
        <input type="text" id="cname" name="cname" value={subDate} onChange={event => setSubDate(event.target.value)}/>
        <br />

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

export default GoalForm;