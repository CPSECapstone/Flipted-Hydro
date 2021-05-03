import React, { useState } from 'react';
import "./QuestionScreen.css";
//var List = require("collections/list");

function FreeResponse() {
   //const [answer]=useState('');
   const [name, setName] = useState('');
    
   const onSubmit = async (event) => {
     alert("Submitted!");
   }
 
    return (
      <div>
      <h1>FREE RESPONSE</h1>
     <div className="chunk">
     <h2>Write an essay on Shakespeare</h2>
      <form onSubmit={onSubmit}>
         
            <input type="text" id="cname" name="cname" value={name} onChange={event => setName(event.target.value)}/>
           <button type="submit" className="submitbutton">Submit</button>
      </form>
      </div>
      </div>
    );
 }
 
 export default FreeResponse;