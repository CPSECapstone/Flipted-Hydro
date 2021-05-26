import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PREV from '../Images/previous.svg';
import ProgressBar from '../ProgressBar.js'

const useRowStyles = makeStyles({

  subTitle: {
    fontFamily: "\"Poppins\", sans-serif",
    fontSize: "16px"
  },
});

//Used to calculate the percent grade for a task submission
function calculateTaskScore(taskSubmission){
    if (taskSubmission == null || taskSubmission.graded == false)
        return null;
    else
        return Math.round(100*(taskSubmission.pointsAwarded/taskSubmission.pointsPossible));
}

function getBarColor(score){
    if (!score)
        return null;
    if (score >= 85)
        return "#30CC30";
    else if (score >= 70)
        return "#F2C94C";
    else
        return "#EA6868";
}

function Row(props) {
    const { task } = props;
    const classes = useRowStyles();

    let score = calculateTaskScore(task.submission);
    let barColor = getBarColor(score);

    return (
        <React.Fragment>
        <TableRow className={classes.root}>
            <TableCell component="th" scope="row" className={classes.subTitle}>
            {"Task: " + task.name}
            </TableCell>
            <TableCell align="left">
                <ProgressBar
                    width='400'
                    height='30'
                    doneColor={barColor}
                    leftColor='#CCCCCC'
                    total={100}
                    done={score ? score : 0}
                />
            </TableCell>
            <TableCell component="th" scope="row" className={classes.subTitle}>
            {score ? score + "%" : "--%"}
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

function MissionProgressDetails(props){

  const progress = props.missionProgress.progress;
  const mission = props.missionProgress.mission;
  const classes = useTableStyles();

  function allMissionsColumn() {
    return(
        <div style={{width: "80%", margin: "auto", "margin-top": "10em"}}>
            <div className="row">
                <div className="column" style={{display: "grid", "grid-template-columns": "1fr", "justify-items": "center"}}>
                    {props.displayMissions(props.missionData)}
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="detailsContainer">
      <div className="targetDetailsHeaderGrid">
        <div onClick={() => props.closeCallback()}>
          <img src={PREV} alt="Previous Button"/>    
        </div>
        <h1 style={{width: "auto"}}>{"Mission: " + mission.name}</h1>
        <div/>
      </div>
      <div style={{display: "grid", "grid-template-columns" : "1fr 20fr 1fr ", "justify-items": "center"}}>
        <div></div>
        <div className="detailsTableGrid">
          <div/>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell align="left"><h2 className={classes.columnTitle}>Target Item</h2></TableCell>
                  <TableCell align="left"><h2 className={classes.columnTitle}>Score</h2></TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {progress.map((task) => (
                  <Row key={task.taskId} task={task} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div/>
        </div>
        <div style={{"transform": "translate(-250%, -100%)", height: "100px"}}>{allMissionsColumn()}</div>
      </div>
      
    </div>
  );
}

export default MissionProgressDetails;