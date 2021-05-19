import React from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import './QAScreen.css';

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
        {props.map((tile) => (
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