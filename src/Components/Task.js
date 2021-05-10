import { useQuery  } from '@apollo/client';
import { useState } from 'react';
import { GET_TASK } from '../gqlQueries.js';
import { TextTask } from './Text.js';
import Image from './Image.js';
import Video from './Video.js';
import ProgressBar from './ProgressBar.js';
import './Task.css';
import MCQuestion from './MCQuestion.js';
import FRQuestion from './FRQuestion.js';
import TaskRubricDrawer from './TaskRubricDrawer.js'

import PREV from './Images/previous.svg';
import NEXT from './Images/next.svg';

function createTextBlock(blockKey, contents){
  return <div className="taskBlock" key={blockKey}>
    <TextTask text = {contents}/>
  </div>
}

function createImageBlock(blockKey, imageUrl){
  return <div className="taskBlock" key={blockKey}>
    <Image myurl = {imageUrl}/>
  </div>
}

function createVideoBlock(blockKey, videoUrl){
  return <div className="taskBlock" key={blockKey}>
    <Video url = {videoUrl}/>
  </div>
}

function createMCQuestionBlock(taskId, blockId, blockKey, question, existingAnswer, setAnswerCallback){

  if(existingAnswer){
    setAnswerCallback(parseInt(existingAnswer.answer));
  }

  return <div className="taskBlock" key={blockKey}>
    <MCQuestion 
      question={question}
      setAnswerCallback={setAnswerCallback}
      existingAnswer={existingAnswer?.answer}
      context={{
        taskId: taskId,
        blockId: blockId
      }}/>
  </div>
}

function createFRQuestionBlock(taskId, blockId, blockKey, question, existingAnswer, setAnswerCallback){

  if(existingAnswer){
    setAnswerCallback(parseInt(existingAnswer));
  }

  return <div className="taskBlock" key={blockKey}>
    <FRQuestion question={question}
      setAnswerCallback={setAnswerCallback}
      existingAnswer={existingAnswer?.answer}
      context={{
        taskId: taskId,
        blockId: blockId
      }}/>
  </div>
}

function Task(props) {

  const taskId = props?.location?.state?.id;

  const { loading, error, data, refetch} = useQuery(GET_TASK, {
    variables: { id: taskId },
  });

  const [rubricOpen, setRubricOpen] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pDone, setPDone] = useState(1);
  const [fakerequirements, setfakeRequirements] = useState([
    {id: 0, description: "Understand the structure of covalent bonds", isComplete: false}, 
    {id: 1, description: "Understand the properties of covalent bonds", isComplete: false}, 
    {id: 2, description: "Understand the intricacies of covalent bonds", isComplete: false}
  ]);

  if(loading) return (
    <div className = 'tasks'> 
      <h1>Loading...</h1>
    </div>
  )

  if(error){
    console.log(error);
    //throw error;
    return (
      <div className = 'tasks'> 
        <h1>Error!</h1>
      </div>
    );
  }

  const pages = data.task.pages;
  const title = data.task.name;
  const requirements = data.task.requirements;
  
  const pTotal = pages.length;
  const responsesOnPage = new Map();
  let expectedResponseCountOnPage = 0;
  const existingAnswers = data.retrieveQuestionProgress.answers;

  const addPage = () => {
    if(!pages[pageNo].skippable && responsesOnPage.size < expectedResponseCountOnPage){
      alert("Please answer all questions on this page before moving on");
    }
    else if(pageNo < pages.length - 1) {
      setPageNo(pageNo + 1);
      setPDone(pDone + 1);
    }
  }

  const subPage = () => {
    if(pageNo > 0) {
      setPageNo(pageNo - 1);
      setPDone(pDone - 1);
    }
  }

  const submitTask = () => {
    alert(`${title} submitted.`);
  }

  /* creates a callback function for a MCQuestion component
   * to call when the user clicks an answer, allowing this
   * task component to know when the user answered a question,
   * and what answer they gave. */
  function createMCQuestionCallback(blockId, questionId){
    return (answerId) => {
      const response = {
        taskId: taskId,
        questionBlockId: blockId,
        questionId: questionId,
        answerId: parseInt(answerId)
      };
      responsesOnPage.set(questionId, response);
    }
  }

  /* creates a callback function for a FRQuestion component
   * to call when the user types an answer, allowing this
   * task component to know when the user answered a question,
   * and what answer they gave. */
  function createFRQuestionCallback(blockId, questionId){
    return (answer) => {
      const response = {
        taskId: taskId,
        questionBlockId: blockId,
        questionId: questionId,
        answer: answer
      };
      responsesOnPage.set(questionId, response);
    }
  }

  function renderHeader() {
    return(
      <div className='header'>
        <h1>{ title }</h1>
        
        
        <div className="headerButtons">
          <div>{ renderPrevButton() }</div>
          {/* <div>{ renderRubricButton() }</div> */}
          
          <ProgressBar 
            width='700'
            height='10'
            doneColor='#4274F3'
            leftColor='rgb(108, 108, 133)'
            total={pTotal}
            done={pDone}
          />
          
          <div>{ (pageNo < pages.length - 1) ? renderNextButton() : renderSubmitButton()}</div>
          
        </div>
        
        
      </div>
    
    );
  }

  function renderPrevButton() {
    return (<div
      onClick= { () => subPage() }
      style={pageNo > 0 ? {} : {visibility: "hidden"}}>
        <img src={PREV} alt="Previous Button" />
        
        </div>);
  }

  function renderNextButton() {
    if(pageNo < pages.length - 1) {
      return (<div onClick = { () => addPage() }>
        <img src={NEXT} alt="Next Button" />
        </div>);
    }
  }

  function renderRubricButton() {
      return (<div className="rubricButton" onClick = { () => setRubricOpen(!rubricOpen) }>TASK RUBRIC</div>);
  }

  function renderSubmitButton() {
    // if(pageNo === pages.length - 1) {
    //   return (<button onClick = { () => submitTask() }>Submit</button>);
    // }
    if (requirementsCompleted())
      return (<button className="submitButton" onClick = { () => submitTask() }>Submit</button>);
    else
      return (<button className="greyedButton">Submit</button>);
  }

  function requirementsCompleted() {
    var rc = true;
    for (var i = 0; i < fakerequirements.length; i++){
      if (!fakerequirements[i].isComplete){
        rc = false;
      }
    }
    return rc;
  }

  function renderRubric() {
    
    return(
      <div className="rubric">
        {rubricOpen ? (
          <div className="requirementsList">{RequirementsList()}{renderSubmitButton()}</div>
        ) : null}
      </div>
    );
  }

  //displays a list of requirements
  function RequirementsList(props) {
    return fakerequirements.map((r) => (
      <Requirement key={r.id} r={r} />
    ));
  }

  //displays one requirement
  function Requirement(props){
    return(
      <div className={props.r.isComplete ? "requirementDone" : "requirement"}>
        <h1 >{props.r.description}</h1>
        <button className="reqCheckButton" courseid={props.r.id} onClick={() => handleCompleteRequirement(props.r.id)}>{props.r.isComplete ? "✅" : ""}</button>
      </div>
      
    );
  }

  function handleCompleteRequirement(requirementId) {
    fakerequirements[requirementId].isComplete = !fakerequirements[requirementId].isComplete;
    setfakeRequirements([...fakerequirements]);
  }

  function renderPage() {
    const page = pages[pageNo];

    if(!page) return <div></div>

    const blockElements = [];
    let blockKey = 0;

    page.blocks.forEach(block => {
      if(block.__typename === 'TextBlock') {
        blockElements.push(createTextBlock(blockKey, block.contents));
      }
      else if(block.__typename === 'ImageBlock') {
        blockElements.push(createImageBlock(blockKey, block.imageUrl));
      }
      else if(block.__typename === 'VideoBlock') {
        blockElements.push(createVideoBlock(blockKey, block.videoUrl));
      }
      else if(block.__typename === 'QuizBlock'){
        block.questions.forEach((question) => {
          if(question.__typename == 'McQuestion'){
            blockElements.push(
              createMCQuestionBlock(taskId, block.blockId, blockKey, question,
                existingAnswers.filter(answer => answer.questionId == question.id)[0],
                createMCQuestionCallback(block.blockId, question.id)
              )
            );
          }
          else if(question.__typename == 'FrQuestion'){
            blockElements.push(
              createFRQuestionBlock(taskId, block.blockId, blockKey, question,
                existingAnswers.filter(answer => answer.questionId == question.id)[0],
                createFRQuestionCallback(block.blockId, question.id)
              )
            );
          }
          else{
            console.error('unknown question type');
          }
          expectedResponseCountOnPage += 1;
          blockKey += 1;
        })        
      }
      else{
        console.error('unknown task block type');
      }
      blockKey += 1;
    });

    return(
      <div className='page'>
        { blockElements }
      </div>
    );
  }

  return (
    <div className = 'tasks'>  
      { renderHeader() }
      <TaskRubricDrawer requirements={requirements} taskId={taskId} submitFunction={submitTask}/>
      { renderRubricButton() }
      {/* { renderRubric() }       */}
      { renderPage() }   
    </div>
  );
}

export default Task;