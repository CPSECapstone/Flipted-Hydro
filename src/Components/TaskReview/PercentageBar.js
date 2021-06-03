import React from 'react';
import './PercentageBar.css';

export default function percentageBar(props) {

   const perc = props.total > 0 ? Math.floor((props.awarded/props.total) * 100 ) : 100;
   const percentageBarWidth = 320;
   const leftColor = props.leftColor;
   const rightColor = props.rightColor;

   function percentageBarLeftStyle() {
      return {
          'width' : ((perc/100) * percentageBarWidth).toString() + 'px',
         'height': '30px',
         'backgroundColor' : leftColor,
         'marginLeft' : '180px',
         'borderBottomLeftRadius' : '12px',
         'borderTopLeftRadius' : '12px',
         'paddingTop' : '7px'
      };
   }

   function percentageBarRightStyle() {
      return {
          'width' : (((100 - perc)/100) * percentageBarWidth).toString() + 'px',
         'backgroundColor' : rightColor,
         'borderBottomRightRadius' : '12px',
         'borderTopRightRadius' : '12px'
      };
   }

   return(
       <div className = 'percentage-bar'>
           <h4 style={percentageBarLeftStyle()}>{`${perc}%`}</h4>
           <h4 style={percentageBarRightStyle()}></h4>
       </div>
   );
}