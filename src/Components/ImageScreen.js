import React from 'react';

function ImageScreen(props) {
   console.log(props.myurl);
    return (
      <div>
         <img src={props.myurl} />
      </div>
    );
 }
 
 export default ImageScreen;