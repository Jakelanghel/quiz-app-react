import React from "react";
import "./Question.css";

const Question = (props) => {
    const getClassName = (i) => {
        let className = null;
        if (props.quizComplete) {
            const isSelected =
                props.selectedAnswer === props.shuffledAnswers[i]
                    ? true
                    : false;

            if (isSelected) {
                className =
                    props.selectedAnswer === props.correctAnswer
                        ? "answer correct"
                        : "answer incorrect";
            } else {
                className =
                    props.shuffledAnswers[i] === props.correctAnswer
                        ? " answer correct"
                        : "answer";
            }
        } else {
            className =
                props.selectedAnswer === props.shuffledAnswers[i]
                    ? "selected-answer answer"
                    : "answer";
        }

        return className;
    };
    return (
        <div className='container-question'>
            <p className='question'>{` ${props.questionCount}.  ${props.question}`}</p>
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
