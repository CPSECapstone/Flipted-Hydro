import React, { useState  } from 'react';
import "./GoalsScreen.css";
import { useMutation } from '@apollo/client';
import { EDIT_OR_CREATE_GOAL, DELETE_GOAL } from '../../gqlQueries';
import { gql } from '@apollo/client';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function strip_subgoal_id(current_goal_state){
  return {
    ...current_goal_state,
    subGoals: current_goal_state.subGoals.map(subGoal => {
      return {
        title: subGoal.title,
        dueDate: subGoal.dueDate,
        completed: subGoal.completed,
        completedDate: subGoal.completedDate,
      }
    })
  }
}

//displays one goal
function Goal(props){

  const goal_open_key = 'GOAL#' + props.goal.id + '#OPEN'
  const [open, setOpen] = useState(localStorage.getItem(goal_open_key) === "open");


  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleEditGoal(){
    props.editGoalCallback(strip_subgoal_id(current_goal_state));
  }

  const [dialogueOpen, setDialogueOpen] = React.useState(false);
  const handleOpenDialogue = () => {
    setDialogueOpen(true);
  };
  const handleCloseDialogue = () => {
    setDialogueOpen(false);
    handleClose();
  };


  let current_goal_state = {
    id: props.goal.id,
    title: props.goal.title,
    dueDate: props.goal.dueDate,
    completed: props.goal.completed,
    completedDate: props.goal.completedDate,
    subGoals: props.goal.subGoals.map((subGoal, index) => {
      return {
        id: index,
        title: subGoal.title,
        dueDate: subGoal.dueDate,
        completed: subGoal.completed,
        completedDate: subGoal.completedDate
      }
    }),
    category: props.goal.category,
    favorited: props.goal.favorited,
    owner: props.goal.owner,
    assignee: props.goal.assignee,
    pointValue: props.goal.pointValue
  }

  const [editGoal] = useMutation(EDIT_OR_CREATE_GOAL, {
  
    update(cache, { data: { editOrCreateGoal } }) {

      const goalObject = {
        __typename: 'Goal',
        id: editOrCreateGoal,
      }

      cache.writeFragment({
        id: cache.identify(goalObject),
        fragment: gql`
          fragment MyGoal on Goal {
            id
            title
            dueDate
            completed
            completedDate
            subGoals
            category
            favorited
            owner
            assignee
            pointValue
          }
        `,
        data: current_goal_state,
      });
    }
  });

  const [deleteGoalMutation] = useMutation(DELETE_GOAL, {
  
    update(cache) {

      const ref = cache.identify({
        __typename: "Goal",
        id: current_goal_state.id
      })

      cache.modify({
        fields: {
          getAllGoals(existingGoals = []) {  
            return existingGoals.filter(goal => goal.__ref != ref)
          }
        }
      });
    }
  });

  function deleteGoal(){
    deleteGoalMutation({
      variables: {
        id: current_goal_state.id
      }
    })
    handleCloseDialogue();
  }

  function allSubGoalsComplete(){
    return current_goal_state.subGoals.filter((subGoal) => !(subGoal.completed)).length === 0;
  }

  function handleCompleteSubGoal(subgoalId) {

    current_goal_state = {
      ...current_goal_state,
      subGoals: current_goal_state.subGoals.map((subGoal) => {
        return {
          id: subGoal.id,
          title: subGoal.title,
          dueDate: subGoal.dueDate,
          completed: subGoal.id === subgoalId ? !(subGoal.completed) : subGoal.completed,
          completedDate: subGoal.completedDate
        }
      }),
    }

    current_goal_state.completed = allSubGoalsComplete();

    editGoal({
      variables: {
        goalInput: strip_subgoal_id(current_goal_state)
      },
      optimisticResponse: {
        editOrCreateGoal: props.goal.id
      }
    })
    localStorage.setItem(goal_open_key, "open");
    setOpen(true);
  }

  function handleStarGoal(goal) {

    current_goal_state = {
      ...current_goal_state,
      favorited: !(goal.favorited),
    }

    editGoal({
      variables: {
        goalInput: strip_subgoal_id(current_goal_state)
      },
      optimisticResponse: {
        editOrCreateGoal: props.goal.id
      }
    })
  }

  function handleCompleteGoal() {

    current_goal_state.completed = !(current_goal_state.completed);

    editGoal({
      variables: {
        goalInput: strip_subgoal_id(current_goal_state)
      },
      optimisticResponse: {
        editOrCreateGoal: props.goal.id
      }
    })
  }

  //displays one subgoal
  function SubGoal(props){
    return(
      <div className={props.sg.completed ? "subGoalDone" : "subGoal"}>
        <h2>{props.sg.title}</h2>
        <p className="checkMark">{props.sg.completed ? "✅" : ""}</p>
        <h2>{"due: "+props.sg.dueDate}</h2>
        <div className="subGoalCheckContainer">
          <IconButton aria-label="complete subgoal" component="span"
            onClick={() => handleCompleteSubGoal(props.sg.id)} style={props.sg.completed ? {color: "#00b500"} : {color: "gray"}}>
                <CheckCircleIcon/>
          </IconButton>
        </div>
      </div>   
    );
  }

  //displays a list of subgoals
  function SubGoalList(props) {
    return props.g.subGoals.map((subg) => (
      <SubGoal key={subg.id} sg={subg} goalId={props.g.id}/>
    ));
  }

  function toggleOpenGoal(){
    localStorage.setItem(goal_open_key, open? "closed" : "open");
    setOpen(!open);
  }

  function hasSubGoals(){
    return current_goal_state.subGoals.length != 0;
  }

  const useStyles = makeStyles(() => ({
    root: {
      color: "black",
    }
  }));
  const classes = useStyles();
  const open_goal_style = {
    "border-style": "solid",
    "border-width": "0.06em"
  }

  return(
    <div className="goal" data-testid={current_goal_state.id} style={open ? open_goal_style : null}>
      <div className="goalGrid">
        <button data-testid={current_goal_state.id + "#starButton"} className="checkButton" 
          onClick={() => handleStarGoal(props.goal)}>{props.goal.favorited ? "⭐" : ""}</button>
        <h2>{props.goal.title}</h2>
        <p className="checkMark">{current_goal_state.completed ? "✅" : ""}</p>
        <h2>{"due: " + props.goal.dueDate}</h2>
        <IconButton data-testid={current_goal_state.id + "#editIconButton"} style={{color: "#4274F3"}}
          aria-label="edit goal" component="span" onClick={handleClick}><EditIcon/></IconButton>
        {hasSubGoals() ?
          <IconButton style={{color: "#4274F3"}} aria-label="expand goal" component="span" onClick={toggleOpenGoal}>
              {open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
          </IconButton> :
          <IconButton aria-label="complete goal" component="span"
          onClick={handleCompleteGoal} style={current_goal_state.completed ? {color: "#00b500"} : {color: "#4274F3"}}>
              <CheckCircleIcon/>
          </IconButton> 
        }
      </div>
      {open? (<SubGoalList g={current_goal_state}/>) : null }

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem data-testid={current_goal_state.id + "#editMenuButton"} className={classes.root}
          onClick={handleEditGoal}>Edit Goal</MenuItem>
        <MenuItem className={classes.root} onClick={handleClose}
          onClick={handleOpenDialogue}>Delete Goal</MenuItem>
      </Menu>

      <Dialog
        open={dialogueOpen}
        onClose={handleCloseDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Goal"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to delete goal \'" + current_goal_state.title + "\'?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent: "center"}}>
          <Button style={{top: "auto"}} onClick={handleCloseDialogue} color="primary" autoFocus>
            No
          </Button>
          <Button style={{top: "auto"}} onClick={deleteGoal} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}

export default Goal;