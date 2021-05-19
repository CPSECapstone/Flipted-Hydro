import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import "./Drawer.css";
import { SUBMIT_TASK_PROGRESS } from '../gqlQueries.js';
import { useMutation  } from '@apollo/client';
import { useState } from 'react';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

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
  const [submitTaskProgess] = useMutation(SUBMIT_TASK_PROGRESS);

  var requirements = props.requirements;

  const [completedIds, setCompletedIds] = useState(props.taskProgress == null ? [] : [...props.taskProgress.finishedRequirementIds]);

  function isComplete(requirementID) {
    return completedIds.includes(requirementID);
  }

  function completeRequirement(taskId, requirementId) {

    if (!completedIds.includes(requirementId)){
      setCompletedIds([...completedIds, requirementId]);//this doesn't update immmediately
      submitTaskProgess({
        variables: {
          id: taskId,
          finishedRequirements: [...completedIds, requirementId]
        }
      });
    }
    else {
      var temp = uncheck(requirementId);
      setCompletedIds(temp);//this doesn't update immediately
      submitTaskProgess({
        variables: {
          id: taskId,
          finishedRequirements: temp
        }
      });
    }
  }

  function uncheck(requirementId) {
    var temp = [];
    for (var i = 0; i < completedIds.length; i++){
      if (completedIds[i] != requirementId){
        temp.push(completedIds[i]);
      }
    }
    return temp;
  }

  function requirementsCompleted() {
    return requirements.length === completedIds.length;
  }

  const toggleDrawer = (openParam) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    props.setRubricOpen(openParam);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      
      
      <List>
          <ListItem button onClick={()=>props.setRubricOpen(false)} key="Logo" >
            <ListItemIcon><DoubleArrowIcon/></ListItemIcon>
            <ListItemText className="logoText" primary="Task Rubric" />
          </ListItem>

          <Divider />

        {requirements.map((requirement) => (
            
            <ListItem button onClick={()=>completeRequirement(props.taskId, requirement.id)}>
                <ListItemIcon>{isComplete(requirement.id) ? (<CheckCircleIcon />) : (<RadioButtonUncheckedIcon />)}</ListItemIcon>
                <ListItemText className="buttonText" primary={requirement.description} />
             </ListItem>
        ))}

            <ListItem button onClick={requirementsCompleted() ? props.submitFunction : null}>
                <ListItemText className={requirementsCompleted() ? "blueButtonText" : "buttonText"} primary="SUBMIT TASK" />
             </ListItem>

      </List>
      <Divider />
    </div>
  );

  return (
    <div>
        <Drawer anchor='right' variant="persistent" open={props.rubricOpen} onClose={toggleDrawer(false)}>
        {list('right')}
        </Drawer>
    </div>
  );
}

export default TaskRubricDrawer;
