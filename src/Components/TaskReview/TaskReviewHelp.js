import React, { useState } from 'react';
import './TaskReviewHelp.css';

function TaskReviewHelp(props) {
   const [response, setName] = useState('');
    
   const onSubmit = async (event) => {
     event.preventDefault();
     alert("Submitted!");
   }
 
    return (
     <div className="help-box">
      <h3>Ask a Question</h3>
        <form className="HelpBlock" onSubmit={onSubmit}>
            <textarea type="text" id="cname" name="cname" value={response} 
            onChange={event => setName(event.target.value)}/>
           <button type="send" className="sendbutton">Send</button>
        </form>
      </div>
    );
 }
 
 export default TaskReviewHelp;