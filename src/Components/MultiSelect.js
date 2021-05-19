import React, { useState } from 'react';
import "./QuestionScreen.css";

function MultiSelect() {
  const [answer,setAnswer]=useState('');

  const handleChange=(e)=>{
      setAnswer( e.target.value);
   }

   const onSubmit = async () => {
    alert("Submitted!");
  }

    return (
      <div>
        <h1>MULTI-SELECT QUIZ</h1>
        <div className="chunk">
          <h2>What is the meaning of life?</h2>
          <form>
              <input type="checkbox" value="A1" id="A1"
                onChange={handleChange} name="answer" />
              <label for="A1">Yes</label>

             <input type="checkbox" value="A2" id="A2"
               onChange={handleChange} name="answer"/>
             <label for="A2">No</label>

             <input type="checkbox" value="A3" id="A3"
               onChange={handleChange} name="answer"/>
             <label for="A3">Maybe</label>

             <input type="checkbox" value="A4" id="A4"
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

export default MultiSelect;