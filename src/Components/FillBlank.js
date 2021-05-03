import React, { useState } from 'react';
import "./QuestionScreen.css";
//var List = require("collections/list");

function FillBlank() {
   //const [answer]=useState('');
   const [name, setName] = useState('');
    const onSubmit = async (event) => {
     alert("Submitted!");
   }

   const mockdata = [
     {myname: 'B1'},
     {myname: 'B1'},
     {myname: 'B1'}];

   const textMap = (data) => {
    return data.map(({name}) => (<input type="text" id="cname" name="cname" value={name} onChange={event => setName(event.target.value)}/>));
   }
 
    return (

      <div className="column">
      <h1>FILL-IN-THE-BLANK</h1>
      <div className="chunk">
      <h2>There are ___ Corners and ___ sides on a triangle. This is a ___.</h2>
      <form onSubmit={onSubmit}>
        <ul>{textMap(mockdata)}</ul>
        <button type="submit" className="submitbutton">Submit</button>
      </form>
      </div>
    
    </div>
    );
 }
 
 export default FillBlank;