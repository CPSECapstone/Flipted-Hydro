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
import { GET_TASK_PROGRESS } from '../gqlQueries.js';
import { SUBMIT_TASK_PROGRESS } from '../gqlQueries.js';
import { useMutation  } from '@apollo/client';
import { useQuery  } from '@apollo/client';

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

  const { loading, error, data, refetch} = useQuery(GET_TASK_PROGRESS, {
    variables: { id: props.taskId },
  });

  function isComplete(requirementID) {
    return data.retrieveTaskProgress.finishedRequirementIds.includes(requirementID);
  }

  function completeRequirement(taskId, requirementId) {
    if (!data.retrieveTaskProgress.finishedRequirementIds.includes(requirementId)){
      submitTaskProgess({
        variables: {
          id: taskId,
          finishedRequirements: [...data.retrieveTaskProgress.finishedRequirementIds, requirementId]
        }
      });
    }
  }

  function requirementsCompleted() {
    // var rc = true;
    // for (var i = 0; i < requirements.length; i++){
    //   if (!requirements[i].isComplete){
    //     rc = false;
    //   }
    // }
    // return rc;
    return requirements.length == data.retrieveTaskProgress.finishedRequirementIds.length;
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
          <ListItem  key="Logo" >
            <ListItemText className="logoText" primary="Task Rubric" />
          </ListItem>

          <Divider />

        {requirements.map((requirement) => (
            
            // <ListItem button  onClick={()=>handleClickRequirement(requirement.id)}>
            <ListItem button onClick={()=>completeRequirement(props.taskId, requirement.id)}>
                <ListItemIcon>{isComplete(requirement.id) ? (<CheckCircleIcon />) : (<RadioButtonUncheckedIcon />)}</ListItemIcon>
                <ListItemText className="buttonText" primary={requirement.description} />
             </ListItem>
        ))}

            <ListItem button onClick={requirementsCompleted() ? props.submitFunction : null}>
              <ListItem button onClick={props.submitFunction}></ListItem>
                <ListItemText className={requirementsCompleted() ? "blueButtonText" : "buttonText"} primary="SUBMIT TASK" />
             </ListItem>

      </List>
      <Divider />
    </div>
  );

  return (
    <div>
        {/* <Button className="rubricHamburgerButton" onClick={toggleDrawer(true)}><MenuIcon/>{"Task Rubric"}</Button> */}
        <Drawer anchor='right' open={props.rubricOpen} onClose={toggleDrawer(false)}>
        {list('right')}
        </Drawer>
    </div>
  );
}

export default TaskRubricDrawer;
