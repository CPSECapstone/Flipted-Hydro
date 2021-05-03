import React from 'react';
import ReactPlayer from 'react-player';
import './Video.css';

function Video(props) {
    return (
      <div className="videoBlock">
         <ReactPlayer url= { props.url }/>
      </div>
    );
 }
 
 export default Video;