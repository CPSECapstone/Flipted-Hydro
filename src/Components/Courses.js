import { useQuery, useMutation  } from '@apollo/client';
import React, { useState } from 'react';
import { GET_COURSE } from '../gqlQueries.js';
import './CourseScreen.css';

//This component is used to display the mission page.
function Course() {
  const { loading, error, data } = useQuery(GET_COURSE, {
    variables: { id: "a71e775af83" },
  });

  if(loading) return (
    <h2>Loading...</h2>
  )

  if(error){
    console.log(error);
    return (
      <h2>Error!</h2>
    );
  }

  const instructor = data.courseInfo.instructor;
  const title = data.courseInfo.course;
  const description = data.courseInfo.description;

  function displayMissions(data) {
  }

  return (
    <div> 
      <h1>MY COURSES</h1>
      <h2>{title}</h2>
      <h2>{description}</h2>
      
    </div>
  );
}

export default Course;
