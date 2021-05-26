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
    
    function qaBoxTile() {
        var rtn = [];
        for(const entry in props.qa) {
            rtn.push(
                <h5>{qNum}</h5>
            );
            setQNum(qNum + 1);
        }
        return rtn;
    }

    function qaBox() {
        return (
            /*<GridList cellHeight={45} className='qa-box' cols={1} style={gridListStyle}>
                {props.qa.map((tile) => (
                    <GridListTile key={tile.question.id} cols={1}>
                        <div className='qa-box-tile'>
                            <h5>{qNum}</h5>
                        </div>
                    </GridListTile>
                ))}
            </GridList>*/
            <div className='qa-box'>
                {props.qa.map((entry) => (
                    <div className='qa-box-tile'>
                        <h5>{entry.question.description}</h5>
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