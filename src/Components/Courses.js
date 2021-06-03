import { useQuery, useMutation  } from '@apollo/client';
import React, { useState } from 'react';
import { GET_COURSE } from '../gqlQueries.js';
import './CourseScreen.css';
import { useHistory } from 'react-router';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderTop: "1em solid #4274F3",
    '&:hover': {
      background: "#E0E0E0",
   },
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
    paddingTop: "1em",
    paddingBottom: "1em",
    fontFamily: "\"Poppins\", sans-serif",
  }
});

//This component is used to display a student's courses.
function Course() {
  const courses =
  {
    "courseInfos": [
      {
        "courseId": "a71e775af83",
        "course": "Integrated Science",
        "instructor": "Mr. Butcher",
        "description": "Biology, anatomy, cell structure"
      }
    ]
  }

  const MISSION_COMPONENT_PATH = "/missions";

  const hist = useHistory();

  const classes = useStyles();

  function changeToMissionsScreen(courseId){
    console.log(courseId);
    hist.push({
      pathname:MISSION_COMPONENT_PATH,
      state: {
        id: courseId
      }
    });
  }

  function displayCourses(data) {
    return data.courseInfos.map((courseItem) => {
        return ( 
          <Card key={courseItem.courseId} className={classes.root}
            onClick={() => changeToMissionsScreen(courseItem.courseId)}>
            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Course
              </Typography>
              <Typography variant="h5" component="h2" className={classes.targetName}>
              {courseItem.course}
              </Typography>
            </CardContent>
          </Card>
        )
      } 
    );
  }

  const courseGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "2em",
    justifyItems: "center",
    paddingTop: "2em"
  }

  return (
    <div> 
      <h6>My Courses</h6>
      <div style={courseGridStyle}>{displayCourses(courses)}</div>
    </div>
  );
}

export default Course;
