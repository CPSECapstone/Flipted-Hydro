import { MASTERY_TAG } from './MasteryLabel';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StarIcon from '@material-ui/icons/Star';

function MasteryIcon(props){

  const mastery = props.mastery;

  function getIconColor(){
    if(mastery == MASTERY_TAG.NOT_GRADED) return '#E0E0E0';
    if(mastery == MASTERY_TAG.NOT_MASTERED) return '#EA6868';
    if(mastery == MASTERY_TAG.NEARLY_MASTERED) return '#F2C94C';
    if(mastery == MASTERY_TAG.MASTERED) return '#30CC30';
  }

  function getIcon(){
    if(mastery == MASTERY_TAG.MASTERED){
      return (
        <StarIcon style={{color: getIconColor()}}/>
      );
    } else {
      return (
        <FiberManualRecordIcon style={{color: getIconColor()}}/>
      );
    }
  }

  return (
    <div>{getIcon()}</div>
  );
}

export default MasteryIcon;