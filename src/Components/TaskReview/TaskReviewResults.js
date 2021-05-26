import React from 'react';
import TaskReviewStats from './TaskReviewStats.js';
import './TaskReviewResults.css';

export default function TaskReviewResults(props) {

   const submission = props?.submission;
   const mockObjectives = [
     "Learning Objective 1",
     "Learning Objective 2",
     "Learning Objective 3",
     "Learning Objective 4",
   ]

   const mapObjectives = (req) => {
      if (!req) return [];
      return req.map(({ description, id }) => (
        <div key={id}>
          <input type="string" value="A1" id="A1" checked={true}/>
          <label for="A1">{description}</label>
        </div>))
    }

   return (
        <div className="row">
          <div className="column"></div>
          <div className="column">
            <div className="stat-box">
              <TaskReviewStats submission={submission} />
            </div>
          </div>
          <div className="column">
            <div className="objective-column">
              <h1>Learning Objectives</h1>
              <h2>Temporary Learning Objective Filler</h2>
            </div>
          </div>
        </div>
    );
}
