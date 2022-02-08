import React from "react";
import "./Question.css";

const Question = (props) => {
    return (
        <div className='container-question'>
            <p className='question'>{props.question}</p>
            <ul className='answers'>
                <li
                    className={
                        props.selectedAnswer === props.shuffledAnswers[0]
                            ? props.answerClassName
                            : "answer"
                    }
                    onClick={props.handleClick}
                    id={props.id}
                >
                    {props.shuffledAnswers[0]}
                </li>
                <li
                    className={
                        props.selectedAnswer === props.shuffledAnswers[1]
                            ? props.answerClassName
                            : "answer"
                    }
                    onClick={props.handleClick}
                    id={props.id}
                >
                    {props.shuffledAnswers[1]}
                </li>
                <li
                    className={
                        props.selectedAnswer === props.shuffledAnswers[2]
                            ? props.answerClassName
                            : "answer"
                    }
                    onClick={props.handleClick}
                    id={props.id}
                >
                    {props.shuffledAnswers[2]}
                </li>
                <li
                    className={
                        props.selectedAnswer === props.shuffledAnswers[3]
                            ? props.answerClassName
                            : "answer"
                    }
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
