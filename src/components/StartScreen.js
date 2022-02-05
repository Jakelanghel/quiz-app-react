import React from "react";
import "./startScreen.css";

const StartScreen = (props) => {
    return (
        <div className='container-start-screen'>
            <h1 className='title mg-bottom'>quizzical</h1>
            <p className='sub-title mg-bottom'>sub title</p>
            <button className='start-btn btn' onClick={props.handleClick}>
                start quiz
            </button>
        </div>
    );
};

export default StartScreen;
