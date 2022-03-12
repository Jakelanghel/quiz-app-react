import React from "react";
import "./containerBackground.css";

const ContainerBackground = (props) => {
    return (
        <div className='container-background-image'>
            <div className='container-background-color'>{props.children}</div>
        </div>
    );
};

export default ContainerBackground;
