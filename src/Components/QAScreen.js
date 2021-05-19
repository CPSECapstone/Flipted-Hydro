import React from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import './QAScreen.css';

// Sample Data.

const sampleData = [
       {
        "question": {
          "id": "FR_QUESTION#d1b687205e4",
          "description": "Give some examples of molecules that contain covalent bonds",
          "points": 10,
          "feedback": null
        },
        "answer": {
          "questionId": "FR_QUESTION#d1b687205e4",
          "pointsAwarded": 0,
          "answer": "Hydrogen, Ammonia, etc."
        }
      },
      {
        "question": {
          "id": "MC_QUESTION#2cb7e34fcb6",
          "description": "What is a covalent bond?",
          "points": 5,
          "feedback": null
        },
        "answer": {
          "questionId": "MC_QUESTION#2cb7e34fcb6",
          "pointsAwarded": 0,
          "answer": "0"
        }
      },
      {
        "question": {
          "id": "FR_QUESTION#d1b687205e4",
          "description": "Give some examples of molecules that contain covalent bonds",
          "points": 10,
          "feedback": null
        },
        "answer": {
          "questionId": "FR_QUESTION#d1b687205e4",
          "pointsAwarded": 0,
          "answer": "Hydrogen, Ammonia, etc."
        }
      },
      {
        "question": {
          "id": "MC_QUESTION#2cb7e34fcb6",
          "description": "What is a covalent bond?",
          "points": 5,
          "feedback": null
        },
        "answer": {
          "questionId": "MC_QUESTION#2cb7e34fcb6",
          "pointsAwarded": 5,
          "answer": "0"
        }
      },
];

export default function QAScreen(props) {

  const height = props.height ? props.height : "150px";
  const spacing = props.spacing ? props.spacing : 45;

  function GetBlockColor(id, points, pointsAwarded) {
    const type = id.split('#')[0];

    if(type === 'FR_QUESTION') {
      return '#F2C94C';
    }
    if(pointsAwarded/points >= 1) {
      return '#27AE60';
    }
    return '#EB5757';
  }

  function ScrollableGridList() {
    return(
      <GridList cellHeight={spacing} className='scroll-grid' cols={1} style={{'height' : `${height}`}}>
        {sampleData.map((tile) => (
          <GridListTile key={tile.question.id} cols={1} >
            <label style={{'backgroundColor' : GetBlockColor(tile.question.id, tile.question.points, tile.answer.pointsAwarded)}}>
              {tile.question.description}
            </label>
          </GridListTile>
        ))}
      </GridList>
    );
  }

    return(
        <div className='scroll-grid-wrapper'>
            <ScrollableGridList />
        </div>
    );
}