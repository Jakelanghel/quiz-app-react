import React from "react";
import "./Question.css";

const Question = (props) => {
    // console.log(props.score);
    const getClassName = (index) => {
        if (props.shuffledAnswers[index] === props.selectedAnswer) {
            if (props.score > 0) {
                if (props.selectedAnswer === props.correctAnswer) {
                    return "answer correct";
                } else {
                    return "answer incorrect";
                }
            } else {
                return "answer selected-answer";
            }
        } else {
            return "answer";
        }
    };
    return (
        <div className='container-question'>
            <p className='question'>{props.question}</p>
            <ul className='answers'>
                <li
                    className={getClassName(0)}
                    onClick={props.handleClick}
                    id={props.id}
                >
                    {props.shuffledAnswers[0]}
                </li>
                <li
                    className={getClassName(1)}
                    onClick={props.handleClick}
                    id={props.id}
                >
                    {props.shuffledAnswers[1]}
                </li>
                <li
                    className={getClassName(2)}
                    onClick={props.handleClick}
                    id={props.id}
                >
                    {props.shuffledAnswers[2]}
                </li>
                <li
                    className={getClassName(3)}
                    onClick={props.handleClick}
                    id={props.id}
                >
                    {props.shuffledAnswers[3]}
                </li>
            </ul>
        </div>
    );
};

export default Question;
