import { useMutation } from '@apollo/client';
import React, { useState  } from 'react';
import { EDIT_OR_CREATE_GOAL } from '../gqlQueries';
import "./GoalsScreen.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

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

  const classes = useStyles();

  return (
    <div>

      <form className={classes.root} noValidate autoComplete="off">
        <h2 style={{display: "flex"}}>Create Goal</h2>
        <TextField id="outlined-basic" label="Title" variant="outlined"
          value={title} onChange={event => setTitle(event.target.value)}/>
        <TextField id="outlined-basic" label="Category" variant="outlined"
          value={category} onChange={event => setCategory(event.target.value)}/>
        <TextField id="outlined-basic" label="Due Date" variant="outlined"
          value={dueDate} onChange={event => setDueDate(event.target.value)}/>
        <br/><br/>
        <TextField id="outlined-basic" label="SubGoal Title" variant="outlined"
          value={subTitle} onChange={event => setSubTitle(event.target.value)}/>
        <TextField id="outlined-basic" label="SubGoal Due Date" variant="outlined"
          value={subDate} onChange={event => setSubDate(event.target.value)}/>
        <button type="button" onClick={handleAddSubgoal}>add subgoal</button>
      </form>

      <div>
        {subGoals.map((subgoal, i)=>(
        <p key={i}>{subgoal.title}</p>
        ))}
      </div>

      <br/>
      <button type="button" className="submitbutton" onClick={handleAddGoal}>Submit</button>

    </div>      
  )
}

export default GoalForm;