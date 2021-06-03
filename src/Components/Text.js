import React from 'react';

export function TextTask(props) {
    return(
    <div>
        <h3 style={{lineHeight: "inherit"}}>{props.text}</h3>
    </div>
    );
}
