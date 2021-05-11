import React, { useState  } from 'react';
import "./GoalsScreen.css";
import { useMutation } from '@apollo/client';
import { EDIT_OR_CREATE_GOAL } from '../gqlQueries';
import { gql } from '@apollo/client';

function strip_subgoal_id(current_goal_state){
  return {
    ...current_goal_state,
    subGoals: current_goal_state.subGoals.map(subGoal => {
      return {
        title: subGoal.title,
        dueDate: subGoal.dueDate,
        completed: subGoal.completed,
        completedDate: subGoal.completedDate,
      }
    })
  }
}

//displays one goal
function Goal(props){

  const goal_open_key = 'GOAL#' + props.goal.id + '#OPEN'
  const [open, setOpen] = useState(localStorage.getItem(goal_open_key) === "open");

  let current_goal_state = {
    id: props.goal.id,
    title: props.goal.title,
    dueDate: props.goal.dueDate,
    completed: props.goal.completed,
    completedDate: props.goal.completedDate,
    subGoals: props.goal.subGoals.map((subGoal, index) => {
      return {
        id: index,
        title: subGoal.title,
        dueDate: subGoal.dueDate,
        completed: subGoal.completed,
        completedDate: subGoal.completedDate
      }
    }),
    category: props.goal.category,
    favorited: props.goal.favorited,
    owner: props.goal.owner,
    assignee: props.goal.assignee,
    pointValue: props.goal.pointValue
  }

  const [editGoal] = useMutation(EDIT_OR_CREATE_GOAL, {
  
    update(cache, { data: { editOrCreateGoal } }) {

      const goalObject = {
        __typename: 'Goal',
        id: editOrCreateGoal,
      }

      cache.writeFragment({
        id: cache.identify(goalObject),
        fragment: gql`
          fragment MyGoal on Goal {
            id
            title
            dueDate
            completed
            completedDate
            subGoals
            category
            favorited
            owner
            assignee
            pointValue
          }
        `,
        data: current_goal_state,
      });
    }
  });

  function handleCompleteSubGoal(subgoalId) {

    current_goal_state = {
      ...current_goal_state,
      subGoals: current_goal_state.subGoals.map((subGoal) => {
        return {
          id: subGoal.id,
          title: subGoal.title,
          dueDate: subGoal.dueDate,
          completed: subGoal.id === subgoalId ? !(subGoal.completed) : subGoal.completed,
          completedDate: subGoal.completedDate
        }
      }),
    }

    editGoal({
      variables: {
        goalInput: strip_subgoal_id(current_goal_state)
      },
      optimisticResponse: {
        editOrCreateGoal: props.goal.id
      }
    })
    localStorage.setItem(goal_open_key, "open");
    setOpen(true);
  }

  function handleStarGoal(goal) {

    current_goal_state = {
      ...current_goal_state,
      favorited: !(goal.favorited),
    }

    editGoal({
      variables: {
        goalInput: strip_subgoal_id(current_goal_state)
      },
      optimisticResponse: {
        editOrCreateGoal: props.goal.id
      }
    })
  }

  //displays one subgoal
  function SubGoal(props){
    return(
      <div className={props.sg.completed ? "subGoalDone" : "subGoal"}>
        <h1>{props.sg.title}</h1>
        <p>{"due: "+props.sg.dueDate}</p>
        <button className="checkButton" courseid={props.sg.id} onClick={() => handleCompleteSubGoal(props.sg.id)}>{props.sg.completed ? "✅" : ""}</button>
      </div>   
    );
  }

  //displays a list of subgoals
  function SubGoalList(props) {
    return props.g.subGoals.map((subg) => (
      <SubGoal key={subg.id} sg={subg} goalId={props.g.id}/>
    ));
  }

  function toggleOpenGoal(){
    localStorage.setItem(goal_open_key, open? "closed" : "open");
    setOpen(!open);
  }

  return(
    <div className="goal">
      <div className="goalGrid">
        <button className="arrowButton" onClick={toggleOpenGoal}>{open ? "v" : ">" }</button>
        <h1 >{props.goal.title}</h1>
        <button className="checkButton" courseid={props.goal.id} onClick={() => handleStarGoal(props.goal)}>{props.goal.favorited ? "⭐" : ""}</button>
      </div>
      {open? (<SubGoalList g={current_goal_state}/>) : null }
    </div>
  );
}

export default Goal;