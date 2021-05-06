import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import MenuIcon from '@material-ui/icons/Menu';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import "./Drawer.css";
import { SUBMIT_TASK_PROGRESS } from '../gqlQueries.js';
import { useMutation  } from '@apollo/client';

const useStyles = makeStyles({
  list: {
    width: 500,
  },
  fullList: {
    width: 'auto',
  },
});

function TaskRubricDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [submitTaskProgess] = useMutation(SUBMIT_TASK_PROGRESS);
  const [requirements, setRequirements] = React.useState(props.requirements);

  function completeRequirement(taskId, requirementId) {
        submitTaskProgess({
          variables: {
            id: taskId,
            finishedRequirements: [requirementId]
          }
        })
  }

  function requirementsCompleted() {
    var rc = true;
    for (var i = 0; i < requirements.length; i++){
      if (!requirements[i].isComplete){
        rc = false;
      }
    }
    return rc;
  }

  const toggleDrawer = (openParam) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(openParam);
  };

  function handleClickRequirement(id){
    let temp = [...requirements];
    for (var i = 0; i < temp.length; i++){
      if (temp[i].id == id) {
        temp[i].isComplete = !temp[i].isComplete;
      }
    }
    setRequirements([...temp]);
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      
      
      <List>
          <ListItem  key="Logo" >
            <ListItemText className="logoText" primary="Task Rubric" />
          </ListItem>

          <Divider />

        {requirements.map((requirement) => (
            
            <ListItem button  onClick={()=>handleClickRequirement(requirement.id)}>
                {console.log(requirement.isComplete)}
                <ListItemIcon>{requirement.isComplete ? (<CheckCircleIcon />) : (<RadioButtonUncheckedIcon />)}</ListItemIcon>
                <ListItemText className="buttonText" primary={requirement.description} />
             </ListItem>
        ))}

            <ListItem button  onClick={requirementsCompleted() ? props.submitFunction : null}>
              <ListItem button  onClick={props.submitFunction}></ListItem>
                <ListItemText className={requirementsCompleted() ? "blueButtonText" : "buttonText"} primary="SUBMIT TASK" />
             </ListItem>

      </List>
      <Divider />
    </div>
  );

  return (
    <div>
        <Button className="rubricHamburgerButton" onClick={toggleDrawer(true)}><MenuIcon/>{"Task Rubric"}</Button>
        <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
        {list('right')}
        </Drawer>
    </div>
  );
}

export default TaskRubricDrawer;



