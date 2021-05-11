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
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { withRouter } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import "./Drawer.css";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function NavDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (openParam) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(openParam);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      
      
      <List>
          <ListItem  key="Logo" >
            <ListItemText className="logoText" primary="flipt.ED" />
          </ListItem>

          <Divider />

          <ListItem button key="Grades" onClick={() => (props.history.push('/gradescreen'))}>
            <ListItemIcon><SpellcheckIcon /></ListItemIcon>
            <ListItemText className="buttonText" primary="Grades" />
          </ListItem>

          <ListItem button key="Goals" onClick={() => (props.history.push('/goalsscreen'))}>
            <ListItemIcon><DoneAllIcon /></ListItemIcon>
            <ListItemText className="buttonText" primary="Goals" />
          </ListItem>
          <ListItem button key="Missions" onClick={() => (props.history.push('/mission'))}> 
            <ListItemIcon><AssignmentTurnedInIcon /></ListItemIcon>
            <ListItemText className="buttonText" primary="Missions" />
          </ListItem>

          
          <ListItem button key="Task" onClick={() => (props.history.push('/task'))}>
            <ListItemIcon><LinearScaleIcon /></ListItemIcon>
            <ListItemText className="buttonText" primary="Task" />
          </ListItem>

          <ListItem button key="Courses" onClick={() => (props.history.push('/coursescreen'))}>
            <ListItemIcon><ViewModuleIcon /></ListItemIcon>
            <ListItemText className="buttonText" primary="Courses" />
          </ListItem>

      </List>
      <Divider />
    </div>
  );

  return (
    <div>
        <Button className="hamburgerButton" onClick={toggleDrawer(true)}><MenuIcon style={{ color: "white" }}/></Button>
        <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        {list('left')}
        </Drawer>
    </div>
  );
}

export default withRouter(NavDrawer);



