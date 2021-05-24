import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PREV from '../Images/previous.svg';
import MasteryLabel from './MasteryLabel';
import MasteryIcon from './MasteryIcon';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },  
  },
  objectiveName: {
    fontFamily: "\"Poppins\", sans-serif",
    fontSize: "20px"
  },
  subTitle: {
    fontFamily: "\"Poppins\", sans-serif",
    fontSize: "16px"
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className={classes.objectiveName}>
          {"Objective " + row.objectiveName}
        </TableCell>
        <TableCell align="left">
        <MasteryIcon mastery={"NEARLY_MASTERED"}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.tasks.map((taskMastery, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" component="th" scope="row">
                        {"Task " + taskMastery.task.name}
                      </TableCell>
                      <TableCell align="left">
                        <MasteryLabel mastery={taskMastery.mastery}/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useTableStyles = makeStyles({
  root: {
    textAlign: "left"
  },
  columnTitle: {
    fontFamily: "\"Poppins\", sans-serif",
    fontSize: "20px",
    textAlign: "left",
    color: "#828282"
  },
});

function TargetDetails(props){

  const targetProgress = props.targetProgress;
  const classes = useTableStyles();

  return (
    <div className="detailsContainer">
      <div className="targetDetailsHeaderGrid">
        <div onClick={() => props.closeCallback()}>
          <img src={PREV} alt="Previous Button"/>    
        </div>
        <h1>{"Learning Target: " + targetProgress.target.targetName}</h1>
        <div/>
      </div>
      <div className="detailsTableGrid">
        <div/>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left"><h2 className={classes.columnTitle}>Target Item</h2></TableCell>
                <TableCell align="left"><h2 className={classes.columnTitle}>Mastery</h2></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {targetProgress.objectives.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div/>
      </div>
    </div>
  );
}

export default TargetDetails;