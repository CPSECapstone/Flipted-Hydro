import React from 'react';
import ReactPlayer from 'react-player';

function VideoScreen(props) {
    return (
      <div >
         <ReactPlayer url= { props.url } />
      </div>
    );
 }
 
 export default VideoScreen;