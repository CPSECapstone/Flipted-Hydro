import React from 'react';

function Image(props) {
   if(!props.myurl) {
      return (<div></div>)
   }

    return (
      <div>
         <img src={props.myurl}
          alt="https://cdn2.iconfinder.com/data/icons/digital-and-internet-marketing-4-1/50/192-512.png"/>
      </div>
    );
 }
 
 export default Image;