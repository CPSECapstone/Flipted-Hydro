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
  objectiveLabelCell: {
    display: "flex",
    justifyContent: "right",
    paddingLeft: "0em"
  },
  taskLabelCell: {
    display: "flex",
    justifyContent: "right",
    paddingRight: "0em"
  },
  expandIcon: {
    width: "30.8px"
  }
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell className={classes.expandIcon}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className={classes.objectiveName}>
          {"Objective " + row.objectiveName}
        </TableCell>
        <TableCell align="left" className={classes.objectiveLabelCell}>
        <MasteryLabel mastery={"NEARLY_MASTERED"}/>
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
                      {/* <TableCell align="left">
                        <div/>
                      </TableCell> */}
                      <TableCell align="left" component="th" scope="row">
                        {"Task " + taskMastery.task.name}
                      </TableCell>
                      <TableCell align="right" className={classes.taskLabelCell}>
                        <MasteryIcon mastery={taskMastery.mastery}/>
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
  objectiveTitle: {
    fontFamily: "\"Poppins\", sans-serif",
    fontSize: "20px",
    textAlign: "left",
    color: "#828282"
  },
  masteryTitle: {
    fontFamily: "\"Poppins\", sans-serif",
    fontSize: "20px",
    textAlign: "right",
    color: "#828282",
    paddingRight: "3em"
  },
});

function TargetDetails(props){

  const targetProgress = props.targetProgress;
  const classes = useTableStyles();

  return (
    <div style={{height: "max-content", width: "100%"}}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left"><h2 className={classes.objectiveTitle}>Target Item</h2></TableCell>
              <TableCell align="center"><h2 className={classes.masteryTitle}>Mastery</h2></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {targetProgress.objectives.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TargetDetails;