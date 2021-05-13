import { useQuery, useMutation  } from '@apollo/client';
import React, { useState } from 'react';
import { GET_COURSE } from '../gqlQueries.js';
import './CourseScreen.css';
import { useHistory } from 'react-router';

//This component is used to display a student's courses.
function Course() {
  /*const { loading, error, data } = useQuery(GET_COURSE, {
    variables: { id: "a71e775af83" },
  });*/

  const courses =
  {
    "courseInfos": [
      {
        "courseId": "e510f27e125",
        "course": "English",
        "instructor": "Mr. Butcher",
        "description": "Shakespeare and other classics"
      },
      {
        "courseId": "62c74e7d0c3",
        "course": "Phys Ed",
        "instructor": "Mr. Butcher",
        "description": "Fitness of the body, mind, and soul "
      },
      {
        "courseId": "a71e775af83",
        "course": "Integrated Science",
        "instructor": "Mr. Butcher",
        "description": "Biology, anatomy, cell structure"
      },
      {
        "courseId": "e25f9337a2e",
        "course": "Science",
        "instructor": "Mr. Butcher",
        "description": "A sample science course"
      },
      {
        "courseId": "a824af5ae39",
        "course": "Math",
        "instructor": "Mr. Butcher",
        "description": "Mathematics Calc 1 - 4"
      },
      {
        "courseId": "b2abdb129d3",
        "course": "Physics",
        "instructor": "Mr. Butcher",
        "description": "Physics introductory course"
      }
    ]
  }

  const MISSION_COMPONENT_PATH = "/missions";

  const hist = useHistory();

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
      //if (courseItem.course === 'Integrated Science') {
        return ( 
          <div key={courseItem.courseId} className='courseItem' onClick={() => changeToMissionsScreen(courseItem.courseId)}>
            <ul>
              {courseItem.course}
            </ul>
          </div>
        )
      } 
      /*else { 
        return ( 
          <div key={courseItem.courseId} className='courseItem'>
            <ul>
              {courseItem.course}
            </ul>
          </div>
        )
      }*/
    //}
    );
  }


  return (
    <div> 
      <h1>My Courses</h1>
      <ul>{displayCourses(courses)}</ul>
      
    </div>
  );
}

export default Course;
