import { useQuery, useMutation  } from '@apollo/client';
import { useState } from 'react';
import { GET_TASK } from '../gqlQueries.js';
import { TextTask } from './Text.js';
import ImageScreen from './ImageScreen.js';
import VideoScreen from './VideoScreen.js';
import ProgressBar from './ProgressBar.js';
import './Task.css';

function Task() {
  const { loading, error, data, refetch} = useQuery(GET_TASK, {
    variables: { id: "4f681550ba9" },
  });

  const [pageNo, setPageNo] = useState(0);
  const [pDone, setPDone] = useState(1);

  if(loading) return (
    <div className = 'tasks'> 
      <p>Loading...</p>
    </div>
  )

  if(error){
    console.log(error);
    return (
      <div className = 'tasks'> 
        <p>Error!</p>
      </div>
    );
  }

  const pages = data.task.pages;
  const title = data.task.name;
  const pTotal = pages.length;

  const addPage = () => {
    if(pageNo < pages.length - 1) {
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

  function renderHeader() {
    return(
      <div className='header'>
        { renderPrevButton() }
        <h1>{ title }</h1>
        { renderAddButton() }
        { renderSubmitButton() }
      </div>
    
    );
  }

  function renderPrevButton() {
    if(pageNo > 0) {
      return (<button onClick= { () => subPage() }>Prev Page</button>);
    }
  }

  function renderAddButton() {
    if(pageNo < pages.length - 1) {
      return (<button onClick = { () => addPage() }>Next Page</button>);
    }
  }

  function renderSubmitButton() {
    if(pageNo === pages.length - 1) {
      return (<button onClick = { () => submitTask() }>Submit</button>);
    }
  }

  function renderPage() {
    const page = pages[pageNo];

    if(!page) return <div></div>

    const blockElements = [];
    page.blocks.forEach(blck => {
      if(blck.__typename === 'TextBlock') {
        blockElements.push(<TextTask text = {blck.contents}/>);
      }
      else if(blck.__typename === 'ImageBlock') {
        blockElements.push(<ImageScreen myurl = {blck.imageUrl}/>);
      }
      else if(blck.__typename === 'VideoBlock') {
        blockElements.push(<VideoScreen url = {blck.videoUrl}/>);
      }
      else{
        console.error('Invalid type or wrongly formatted input.');
        console.log(blck);
      }
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
      { renderPage() }
      <ProgressBar 
        width='700'
        height='10'
        doneColor='#4274F3'
        leftColor='rgb(108, 108, 133)'
        total={pTotal}
        done={pDone}
      />
    </div>
  );
}

export default Task;