import { useMutation } from '@apollo/client';
import React, { useState  } from 'react';
import { EDIT_OR_CREATE_GOAL } from '../../gqlQueries';
import "./GoalsScreen.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

function GoalForm(props) {
  //used by the form as a new goal is built
  const id = props.goal?.id;
  const [title, setTitle] = useState(props.goal?.title ? props.goal.title : '');
  const [category, setCategory] = useState(props.goal?.category ? props.goal.category : '');
  const [subGoals, setSubGoals] = useState(props.goal?.subGoals ? props.goal?.subGoals : []);
  const [dueDate, setDueDate] = useState(props.goal?.dueDate ? moment(props.goal.dueDate) : moment());

  //used by the form as a new subgoal is built
  const [subTitle, setSubTitle] = useState('');
  const [subDate, setSubDate] = useState(moment());
  const [createGoal] = useMutation(EDIT_OR_CREATE_GOAL);


  function submitNewGoal (title, dueDate, category, subGoals) { 

    createGoal({
      variables: {
        goalInput: {
          id: id ? id : undefined,
          title: title,
          dueDate: dueDate.format('yyyy-MM-DD'),
          completed: false,
          subGoals: subGoals,
          category: category,
          favorited: false
        }
      }
    }).then(() => props.closeFormCallBack());
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
    console.log('here');
    console.log(title);
    if(title == '' || category == '' || dueDate == ''){
      alert('All fields are required to create a goal')
    }
    else{
      submitNewGoal(title, dueDate, category, subGoals);
    }
  }

  function deleteSubGoal(event, index){
    event.preventDefault();
    subGoals.splice(index, 1);
    setSubGoals([...subGoals]);
  }

  const classes = useStyles();

  return (
    <div data-testid="goalForm">

      <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container justify="space-evenly" alignItems="center">

      <form className={classes.root} noValidate autoComplete="off">

          <h2 style={{display: "flex"}}>{props.goal ? "Edit Goal" : "Create Goal"}</h2>
          
          <div className="goalInputContainer">
            <TextField id="outlined-basic" label="Title" variant="outlined"
              value={title} onChange={event => setTitle(event.target.value)}/>
            
            <TextField id="outlined-basic" label="Category" variant="outlined"
              value={category} onChange={event => setCategory(event.target.value)}/>
            
            <div className="datePicker">
              <KeyboardDatePicker
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
          </div>
          <br/>

          <h2 style={{display: "flex"}}>Add Sub Goals</h2>
   
          <div className="subGoalPreviewContainer">
            {subGoals.map((subgoal, index)=>(
            <div key={index} className="subGoalItem">
              <p>{subgoal.title}</p>
              <p>{subgoal.dueDate}</p>
              {/* <button className="subGoalDeleteButton" onClick={(event) => deleteSubGoal(event, index)}>Delete</button> */}
              <IconButton aria-label="delete subgoal" component="span" onClick={(event) => deleteSubGoal(event, index)}
                style={{color: "red"}}>
                  <DeleteIcon/>
              </IconButton>
            </div>
            ))}
          </div>

          <div className="subGoalInputContainer">         
            <TextField id="outlined-basic" label="SubGoal Title" variant="outlined"
              value={subTitle} onChange={event => setSubTitle(event.target.value)}/>

            <div className="datePicker">
              <KeyboardDatePicker
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
          </div>     

      </form>
      </Grid>
      </MuiPickersUtilsProvider>

      <br/>
      <div className="submitButtonContainer">
        <button type="button" className="closebutton" onClick={props.closeFormCallBack}>close</button>
        <button type="button" className="submitbutton" onClick={handleAddGoal}>Submit</button>
      </div>
      <br/>
    </div>      
  )
}

export default GoalForm;