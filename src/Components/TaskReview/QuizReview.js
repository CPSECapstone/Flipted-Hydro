import React from 'react';
import { useState } from 'react';
import './QuizReview.css';
import { GridList, GridListTile } from '@material-ui/core';

export default function QuizReview(props) {
    console.log(props.qa);
    const perc = Math.floor((props.pointsAwarded/props.pointsTotal) * 100 );
    const percentageBarWidth = 320;
    const [qNum, setQNum] = useState(1); 

    function percentageBarLeftStyle() {
        return {
            'width' : ((perc/100) * percentageBarWidth).toString() + 'px',
            'height': '30px',
            'backgroundColor' : '#EA6868',
            'marginLeft' : '180px',
            'borderBottomLeftRadius' : '12px',
            'borderTopLeftRadius' : '12px',
            'paddingTop' : '7px'
        };
    }

    function percentageBarRightStyle() {
        return {
            'width' : (((100 - perc)/100) * percentageBarWidth).toString() + 'px',
            'backgroundColor' : '#E0E0E0',
            'borderBottomRightRadius' : '12px',
            'borderTopRightRadius' : '12px'
        };
    }

    const optionGrayStyle = {
        'backgroundColor' : '#F2F2F2',
        'color' : '#4F4F4F',
        'fontFamily' : 'Poppins',
        'fontStyle' : 'normal',
        'fontWeight': 'normal',
        'fontSize' : '16px',
        'width' : '570px',
        'height' : 'auto',
        'padding' : '7px',
        'borderRadius' : '25px',
    };

    const optionGreenStyle = {
        'backgroundColor' : '#27AE60',
        'color' : 'white',
        'fontFamily' : 'Poppins',
        'fontStyle' : 'normal',
        'fontWeight': 'normal',
        'fontSize' : '16px',
        'width' : '570px',
        'height' : 'auto',
        'padding' : '7px',
        'borderRadius' : '25px',
    };

    const optionRedStyle = {
        'backgroundColor' : '#EB5757',
        'color' : 'white',
        'fontFamily' : 'Poppins',
        'fontStyle' : 'normal',
        'fontWeight': 'normal',
        'fontSize' : '16px',
        'width' : '570px',
        'height' : 'auto',
        'padding' : '7px',
        'borderRadius' : '25px',
    }

    function getOptionsStyle(option, selected, correctOption) {
        if((option === selected) && (selected !== correctOption)) {
            return optionRedStyle;
        }
        if(option === selected) {
            return optionGreenStyle;
        }
        if(option === correctOption) {
            return optionGreenStyle;
        }
        return optionGrayStyle;
    }

    function percentageBar() {
        return(
            <div className = 'percentage-bar'>
                <h4 style={percentageBarLeftStyle()}>{`${perc}%`}</h4>
                <h4 style={percentageBarRightStyle()}></h4>
            </div>
        );
    }

    function scoreBox() {
        return(
            <div className='score-box'>
                <h3>{`Score: ${props.pointsAwarded}/${props.pointsTotal}`}</h3>
                {percentageBar()}
            </div>
        );
    }

    function qaBoxContent(entry) {
        const qType = entry.question.id.split('#');
        if(qType[0] == 'FR_QUESTION') {
            return (
            <div>
                <h5>YOUR ANSWER:</h5>
                <h5>{entry.answer.answer}</h5>
            </div>
            );
        }
        const selected = entry.answer.answer;
        const correctOption = entry.answer.correctAnswer;

        return(
            <div className='qa-box-options'>
                {entry.question.options.map((option) => (
                    <h5 style={getOptionsStyle(option.description, selected, correctOption)}>{option.description}</h5>
                ))}
            </div>
        );
    }

    function qaBox() {
        return (
            <div className='qa-box'>
                {props.qa.map((entry) => (
                    <div className='qa-box-tile'>
                        <h5>{entry.question.description}</h5>
                        {qaBoxContent(entry)}
                    </div>
                ))}
            </div>
        );
    }

    return(
        <div className='quiz-review'>
            {scoreBox()}
            {qaBox()}
        </div>
    );
} 