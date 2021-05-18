import { useMutation } from '@apollo/client';
import React, { useState  } from 'react';
import { EDIT_OR_CREATE_GOAL } from '../gqlQueries';
import "./GoalsScreen.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
  const [dueDate, setDueDate] = useState(new Date());

  //used by the form as a new subgoal is built
  const [subTitle, setSubTitle] = useState('');
  const [subDate, setSubDate] = useState(new Date());
  const [createGoal] = useMutation(EDIT_OR_CREATE_GOAL);


  function submitNewGoal (title, dueDate, category, subGoals) { 

    createGoal({
      variables: {
        goalInput: {
          title: title,
          dueDate: dueDate.format('yyyy-MM-DD'),
          completed: false,
          subGoals: subGoals,
          category: category,
          favorited: false
        }
      }
    })
  }

  function handleAddSubgoal() {
    if(subTitle == '' || subDate == ''){
      alert('All fields are required to create a sub goal')
    }
    else {
      setSubGoals([...subGoals, {title: subTitle, completed: false, dueDate: subDate.format('yyyy-MM-DD')}]);
      setSubTitle('');
    }
  }

  function handleAddGoal() {
    if(title == '' || dueDate == ''){
      alert('All fields are required to create a goal')
    }
    else if(subGoals.length == 0){
      alert('Every goal must have a sub goal')
    }
    else{
      submitNewGoal(title, dueDate, category, subGoals);
      setTitle('');
      setCategory('');
      setSubGoals([]);
    }
  }

  const classes = useStyles();

  return (
    <div>

      <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container justify="space-evenly" alignItems="center">

      <form className={classes.root} noValidate autoComplete="off">
          <h2 style={{display: "flex"}}>Create Goal</h2>
          
          <TextField id="outlined-basic" label="Title" variant="outlined"
            value={title} onChange={event => setTitle(event.target.value)}/>
          
          <TextField id="outlined-basic" label="Category" variant="outlined"
            value={category} onChange={event => setCategory(event.target.value)}/>
          
          <div className="datePicker">
            <KeyboardDatePicker
              wrapperClassName="datePicker"
              disableToolbar
              variant="inline"
              format="yyyy-MM-DD"
              margin="normal"
              id="date-picker-inline"
              label="Due Date"
              value={dueDate}
              onChange={date => setDueDate(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </div>
          <br/><br/>

          <TextField id="outlined-basic" label="SubGoal Title" variant="outlined"
            value={subTitle} onChange={event => setSubTitle(event.target.value)}/>

          <div className="datePicker">
            <KeyboardDatePicker
              wrapperClassName="datePicker"
              disableToolbar
              variant="inline"
              format="yyyy-MM-DD"
              margin="normal"
              id="date-picker-inline"
              label="SubGoal Due Date"
              value={subDate}
              onChange={date => setSubDate(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </div>
          <button type="button" onClick={handleAddSubgoal}>add subgoal</button>      


      </form>
      </Grid>
      </MuiPickersUtilsProvider>

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