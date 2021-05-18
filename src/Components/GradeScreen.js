import React from 'react';
import './GradeScreen.css';

const mockData = [
    {name: 'Learning Target 1', completed : 2, prog : 2, untouched : 1}, 
    {name: 'Learning Target 2', completed : 3, prog : 1, untouched : 0},
    {name: 'Learning Target 3', completed : 0, prog : 0, untouched : 5},
    {name: 'Learning Target 4', completed : 6, prog : 8, untouched : 3},
    {name: 'Learning Target 5', completed : 4, prog : 0, untouched : 0},
    {name: 'Learning Target 6', completed : 0, prog : 2, untouched : 7},
    {name: 'Learning Target 7', completed : 2, prog : 8, untouched : 2},
    {name: 'Learning Target 8', completed : 0, prog : 2, untouched : 0}];

function getLineStyle(width, color) {
    return {
        height: '5px',
        width: (width > 5 ? (width - 5) : width) + 'px',
        color: color,
        backgroundColor: color,
        border: '1px solid white'
    };
}


 export function LearningTarget(props) {
    const width = 200;
    const height = 200;
    const total = props.completed + props.prog + props.untouched;

    const bookStyle = {
        width: width.toString() + 'px',
        height: height.toString() + 'px',
        margin: '8px'
    };
    const cLineStyle = getLineStyle(
        (width * (props.completed/total)).toString(), 'green');
    const pLineStyle = getLineStyle(
        (width * (props.prog/total)).toString(), 'orange');
    const uLineStyle = getLineStyle(
        (width * (props.untouched/total)).toString(), 'red');

    const cLine = () => {
        if(props.completed === 0) {
            return null;
        }
        return(<hr style={ cLineStyle }/>);
    }
    const pLine = () => {
        if(props.prog === 0) {
            return null;
        }
        return(<hr style={ pLineStyle }/>);
    }
    const uLine = () => {
        if(props.untouched === 0) {
            return null;
        }
        return(<hr style={ uLineStyle }/>);
    }

    return(
        <div className='learningtarget' data-testid={ props.name } 
        style={ bookStyle }>
            <h3>{props.name}</h3>
            {cLine()}
            {pLine()}
            {uLine()}
        </div>
    );
}

export default function GradeScreen() {
    const learningTargets = mockData.map(lt => {
        return(
            <LearningTarget
            key = {lt.name}
            name = {lt.name}
            completed = {lt.completed}
            prog = {lt.prog}
            untouched = {lt.untouched}
            />
        );
    })
    return(
        <div>
            <h1>GradeBook (Demo)</h1>
            <h2 className="demoLabel">This feature is a demo and functionality is not fully implemented yet. 
         Changes are stored locally and do not fully interact like other aspects of the alpha. Feel free 
         to experiment with its utility and look forward to its full implementation in future versions</h2>
            <div className='gradescreen-grid'>
                { learningTargets }
            </div>
        </div>
    );
}
