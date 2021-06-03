export const MASTERY_TAG = {
  NOT_GRADED: "NOT_GRADED",
  NOT_MASTERED: "NOT_MASTERED",
  NEARLY_MASTERED: "NEARLY_MASTERED",
  MASTERED: "MASTERED"
}

function MasteryLabel(props){

  const mastery = props.mastery;

  function getLabelColor(){
    if(mastery == MASTERY_TAG.NOT_GRADED) return '#E0E0E0';
    if(mastery == MASTERY_TAG.NOT_MASTERED) return '#EA6868';
    if(mastery == MASTERY_TAG.NEARLY_MASTERED) return '#F2C94C';
    if(mastery == MASTERY_TAG.MASTERED) return '#30CC30';
  }

  const labelStyle = {
    backgroundColor: getLabelColor(),
    borderRadius: "1em",
    width: "max-content",
    paddingLeft: "2em",
    paddingRight: "2em",
    fontFamily: "\"Poppins\", sans-serif",
  };

  function getLabelText(){
    if(mastery == MASTERY_TAG.NOT_GRADED) return 'NOT GRADED';
    if(mastery == MASTERY_TAG.NOT_MASTERED) return 'NOT MASTERED';
    if(mastery == MASTERY_TAG.NEARLY_MASTERED) return 'NEARLY MASTERED';
    if(mastery == MASTERY_TAG.MASTERED) return 'MASTERED';
  }

  return (
    <div style={labelStyle}>
      <h2 style={{margin: "0em"}}>{getLabelText()}</h2>
    </div>
  );
}

export default MasteryLabel;