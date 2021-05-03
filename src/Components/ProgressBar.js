import React, { useState } from 'react';
import './ProgressBar.css'

export default function ProgressBar(props) {
    const width = (props.width ? parseInt(props.width, 10) : 700);
    const height = (props.height ? parseInt(props.height, 10) : 10);
    const doneColor = (props.doneColor ? props.doneColor : 'blue');
    const leftColor = (props.leftColor ? props.leftColor : 'gray');

    var total = 10;
    if(props.total) {
        total = props.total.toString();
    } else {
        console.warn('Total missing, default value of 10 being used');
    }
    const totalNum = total;
    var done = 1;
    if(props.done) {
        done = props.done.toString();
    } else {
        console.warn('Done missing, default value of 1 being used');
    }
    const doneNum = done;


    const barStyle = {
        'width' : width.toString() + 'px'
    }


    function getDone() {
        const style = {
            'color' : doneColor,
            'backgroundColor' : doneColor,
            'height' : height.toString() + 'px',
            'width' : (doneNum/totalNum * width).toString() + 'px',
            'border' : '1px solid navy',
            'border-top-left-radius' : '10px',
            'border-bottom-left-radius' : '10px'
        }
        return(
            <hr style = {style}></hr>
        );
    }

    function getLeft() {
        const style = {
            'color' : leftColor,
            'backgroundColor' : leftColor,
            'height' : height.toString() + 'px',
            'width' : ((totalNum-doneNum)/(totalNum) * width).toString() + 'px',
            'border' : '1px solid navy',
            'border-top-right-radius' : '10px',
            'border-bottom-right-radius' : '10px'
        }
        return(
            <hr style = {style}></hr>
        );
    }

    return(
        <div className='pbar' style = {barStyle}>
            { getDone() }
            { getLeft() }
        </div>
    );
}