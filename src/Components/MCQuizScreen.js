import React, { useState } from 'react';
import "./QuestionScreen.css";
//import { useQuery, useMutation  } from '@apollo/client';
//import { GET_QUIZ_QUESTIONS, SUBMIT_QUIZ } from '../gqlQueries.js';
 //get Questions
 //submit button
 //selection buttons


function MCQuizScreen() {
  const [answer,setAnswer]=useState('');

  const handleChange=(e)=>{
      setAnswer( e.target.value);
   }

   const onSubmit = async (event) => {
    alert("Submitted!");
  }

   return (
     <div>
     
     <h1>MULTIPLE CHOICE QUIZ</h1>
     <div className="chunk">
      <h2>What is the meaning of life?</h2>
        <form>
            <input type="radio" value="A1" id="A1"
              onChange={handleChange} name="answer" />
            <label for="A1">Yes</label>

           <input type="radio" value="A2" id="A2"
             onChange={handleChange} name="answer"/>
           <label for="A2">No</label>

           <input type="radio" value="A3" id="A3"
             onChange={handleChange} name="answer"/>
           <label for="A3">Maybe</label>

           <input type="radio" value="A4" id="A4"
             onChange={handleChange} name="answer"/>
           <label for="A4">I don't know</label>
        </form>
        
        <div>
            <button onClick = {onSubmit}>Submit</button>
        </div>
        </div>
     </div>
   );
}

export default MCQuizScreen;