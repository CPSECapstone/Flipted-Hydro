import React, { useState } from 'react';
import './CourseScreen.css';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_COURSES, ADD_COURSE, DELETE_COURSE } from '../gqlQueries.js'


function CourseScreen() {

  const { loading, error, data, refetch} = useQuery(GET_ALL_COURSES);
  const [name, setName] = useState('');
  const [addCourse] = useMutation(ADD_COURSE);
  const [deleteCourse] = useMutation(DELETE_COURSE);

  const onSubmit = async (event) => {
    event.preventDefault();
    try{
      addCourse({ variables: { name: name } }).then(response => {
        setName('');
        refetch();
        alert('Course Created');
      });
    } catch (err) {
      console.error(err);
      alert('Error!');
    }
  }

  const handleDeleteCourse = (event) => {
    console.log(event.target.attributes.courseid);
    try{
      deleteCourse({ variables: { id: event.target.attributes.courseid.value } }).then(response => {
        refetch();
        alert('Course Deleted');
      });
    } catch (err) {
      console.error(err);
      alert('Error!');
    }
  }
  
  const displayCourseList = (loading, error, data) => {
  
    if (loading) return <p>Loading...</p>;
    if (error) {
      console.log(error);
      return <p>Error :(</p>;
    }
    //console.log(data);
    return data.courses.map(({ id, name }) => (
      <div key={id} className='courseItem'>
        <ul>
          {name}<button className="deleteButton" courseid={id} onClick={handleDeleteCourse}>Delete</button>
        </ul>
      </div>
    ));
  }

  return (
    <div> 
      <h1>MY COURSES</h1>
      <div className="row">
        <div className="column">
          <ul>{displayCourseList(loading, error, data)}</ul>
        </div> 
        <div className="column">
          <form onSubmit={onSubmit}>
            <h3>Add Course</h3>
            <label className="courseInput"> Name: </label>
            <input type="text" id="cname" name="cname" value={name} onChange={event => setName(event.target.value)}/>
            <button type="submit" className="submitbutton">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CourseScreen;
