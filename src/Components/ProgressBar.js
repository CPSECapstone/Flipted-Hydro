import React from 'react';
import './ProgressBar.css'

export function numToCSS(num) {
    // Takes an Integer and converts it inot a CSS px value.
    return (num.toString() + 'px');
}

export function calculateWidth(done, total, totalWidth) {
    // Calculates the width for a specific part of the progress bar.
    return ((done/total) * totalWidth);
}

export function getStyle(color, height, width, Num, totalNum, left) {
    // Returns the style object of a portion of the bar.
    if(left) {
        return {
            'color' : color,
            'backgroundColor' : color,
            'height' : numToCSS(height),
            'width' : numToCSS(calculateWidth(Num, totalNum, width)),
            'border' : '1px solid navy',
            'border-top-left-radius' : '10px',
            'border-bottom-left-radius' : '10px'
        }
    }
    return {
        'color' : color,
        'backgroundColor' : color,
        'height' : numToCSS(height),
        'width' : numToCSS(calculateWidth(Num, totalNum, width)),
        'border' : '1px solid navy',
        'border-top-right-radius' : '10px',
        'border-bottom-right-radius' : '10px'
    }

}

export function propsOrDefault(props) {
    // Checks for props, returns defaults in case props are missing.
    const width = (props.width ? parseInt(props.width, 10) : 700);
    const height = (props.height ? parseInt(props.height, 10) : 10);
    const doneColor = (props.doneColor ? props.doneColor : 'blue');
    const leftColor = (props.leftColor ? props.leftColor : 'gray');

    var total = 10;
    if(props.total) {
        total = props.total;
    } else {
        console.warn('Total missing, default value of 10 being used');
    }
    const totalNum = total;
    var done = 0;
    if(props.done || props.done == 0) {
        done = props.done;
    } else {
        console.warn('Done missing, default value of 1 being used');
    }
    const doneNum = done;

    return {
        width: width,
        height: height,
        doneColor: doneColor,
        leftColor: leftColor,
        totalNum: totalNum,
        doneNum: doneNum,
        leftNum: totalNum - doneNum,
    }

}


export default function ProgressBar(props) {
    // Reusable Progress bar that dynamically updates.
    // Needs the following props but defaults are used in case they are not provided.
    // width: Total width of the bar in px, provided as a number.(ex 700)
    // height: Total height of the bar in px, provided as a number. (ex 10)
    // doneColor: The CSS color for the updating part of the bar. Make sure to provide a valid CSS value.(ex: 'blue', 'rgb(0, 0, 0)')
    // leftColor: The CSS color for the remaining part of the bar. Make sure to provide a valid CSS value.(ex: 'blue', 'rgb(0, 0, 0)')
    // total: Integer value representing the total number of a certain thing (ex tasks, goals, etc). Should be constant.
    // done: Integer value representing the total number of completed/done things (ex tasks, goals, etc). Can be updated/modifed, progress bar will change accordingly.

    const vals = propsOrDefault(props);
    const barStyle = {
        'width' : numToCSS(vals.width),
    }
    const testId = 'progress-bar' + '-' + vals.doneColor + '-' + vals.leftColor + '-' + vals.width + '-' + vals.height;

    return(
        <div className='pbar' style = {barStyle} data-testid={testId}>
            <hr style = {getStyle(vals.doneColor, vals.height, vals.width, vals.doneNum, vals.totalNum, true)}></hr>
            <hr style = {getStyle(vals.leftColor, vals.height, vals.width, vals.leftNum, vals.totalNum, false)}></hr>
        </div>
    );
}