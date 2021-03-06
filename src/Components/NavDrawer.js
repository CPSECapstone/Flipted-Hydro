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
          <ListItem button key="Logo" onClick={() => (props.history.push(props.homePath))}>
            <ListItemText className="logoText" primary="flipt.ED" />
          </ListItem>

          <Divider />

          <ListItem button key="Courses" onClick={() => (props.history.push('/courses'))}>
            <ListItemIcon><ViewModuleIcon /></ListItemIcon>
            <ListItemText className="buttonText" primary="Courses" />
          </ListItem>

          <ListItem button key="Progress Overview" onClick={() => (props.history.push('/progoverview'))}>
            <ListItemIcon><SpellcheckIcon /></ListItemIcon>
            <ListItemText className="buttonText" primary="Progress" />
          </ListItem>

          <ListItem button key="Goals" onClick={() => (props.history.push('/goals'))}>
            <ListItemIcon><DoneAllIcon /></ListItemIcon>
            <ListItemText className="buttonText" primary="Goals" />
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