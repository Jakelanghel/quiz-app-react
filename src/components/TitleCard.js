import React from "react";
import "../components/titleCard.css";

const TitleCard = (props) => {
    return (
        <div className='title-card'>
            <h1 className='quiz-category'>{props.category}</h1>
            <p className='difficulty-p'>
                Difficulty:{" "}
                <span className='diff-level'>{props.difficulty}</span>
            </p>
        </div>
    );
};

export default TitleCard;
