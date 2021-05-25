import { useQuery} from '@apollo/client';
import React, { useState } from 'react';
import ProgressBar from '../ProgressBar.js'
import './MasteryProgress.css'
import { GET_ALL_TARGET_PROGRESS, GET_TARGETS } from '../../gqlQueries.js';
import { mockTargetProgress } from './MockData';
import TargetDetails from './TargetDetails';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MasteryLabel from './MasteryLabel';
import PREV from '../Images/previous.svg';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderTop: "1em solid #4274F3",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14,
    fontFamily: "\"Poppins\", sans-serif",
  },
  pos: {
    marginBottom: 12
  },
  button: {
    top: "auto",
    width: "auto",
    height: "auto",
    fontFamily: "\"Poppins\", sans-serif",
    color: "#4274F3",
    textTransform: "none"
  },
  cardContent: {
    paddingBottom: "0px",
    fontFamily: "\"Poppins\", sans-serif",
  },
  targetName: {
    paddingTop: "0.5em",
    fontFamily: "\"Poppins\", sans-serif",
  }
});

//This component is used to display the Student Progress Overview.
function MasteryProgress() {

  const [focusedTarget, setFocusedTarget] = useState(null);

  //Query Target Progress Data
  const { loading, error, data, refetch: tpRefecth} = useQuery(GET_ALL_TARGET_PROGRESS, {
    variables: {id: "Integrated Science"}
  });

  const classes = useStyles();

  //----------- Mastery Progress (Learning Targets)----------
  if(loading) return (
    <h2>Loading...</h2>
  )

  if(error){
    return (
      <h2>Error!</h2>
    );
  }

  const allTargetProgress = data.getAllTargetProgress;

  function changeFocusedTarget(target){
    setFocusedTarget(target)
  }

  function mapTargetsToCards() {

    return allTargetProgress.map((progress) => {
      return (
        <Card key={progress.target.targetId} className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Learning Target
          </Typography>
          <Typography variant="h5" component="h2" className={classes.targetName}>
          {progress.target.targetName}
          </Typography>
          <MasteryLabel mastery="NEARLY_MASTERED"/>
        </CardContent>
        <CardActions>
          <Button className={classes.button} size="small" 
            onClick={() => changeFocusedTarget(progress)}>Details</Button>
        </CardActions>
      </Card>
      )        
    });
  }

  function TargetGrid(){
    return (
      <div className="gridContainer">
        <div/>
        <div className="targetGrid">
          {mapTargetsToCards()}
        </div>
        <div/>
      </div>
    );
  }

  const targetListStyle = {
    display: "flex",
    flexDirection: "column",
    width: "max-content",
    gap: "2em",
  }

  function TargetList(){
    return (
      <div style={targetListStyle}>
        {mapTargetsToCards()}
      </div>
    );
  }

  function closeTargetDetails(){
    setFocusedTarget(null);
  }

  const verticalLineStyle = {
    borderRight: "1px solid gray"
  }

  function renderLayout(){
    if(focusedTarget != null){
      return (
        <div className="detailsTableGrid">
          <div/>
          <TargetDetails closeCallback={closeTargetDetails} targetProgress={focusedTarget}/>
          <div style={verticalLineStyle}/>
          <TargetList/>
        </div>
      );
    } else {
      return (
        <TargetGrid/>
      );
    }
  }

  function renderHeader(){
    if(!focusedTarget){
      return (
        <h1>Mastery Progress</h1>
      );
    } else {
      return (
        <div className="targetDetailsHeaderGrid">
          <div onClick={closeTargetDetails}>
            <img src={PREV} alt="Previous Button"/>    
          </div>
          <h1>{"Learning Target: " + focusedTarget.target.targetName}</h1>
          <div/>
        </div>
      );
    }
  }

  return (
    <div>
        {renderHeader()}
        {renderLayout()}                         
    </div>
  );
}

export default MasteryProgress;