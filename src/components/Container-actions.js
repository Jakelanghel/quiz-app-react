import React from "react";
import "./Container-actions.css";

const ContainerActions = (props) => {
    return (
        <div className='actions-background'>
            <div className='container-actions'>
                {props.quizData.errors && (
                    <p className='msg error-msg'>
                        please answer ALL questions to continue
                    </p>
                )}
                {props.quizData.quizComplete && (
                    <p className='msg score-msg'>
                        {`you scored ${props.quizData.score} / ${props.quizData.questionsArr.length} correct answers.`}
                    </p>
                )}

                <button
                    className='check-btn btn'
                    onClick={
                        props.quizData.quizComplete
                            ? props.resetGame
                            : props.gradeQuiz
                    }
                >
                    {props.quizData.quizComplete
                        ? "Play Again"
                        : "Check Answers"}
                </button>
                <button className='main-menu-btn' onClick={props.backToMenu}>
                    main menu
                </button>
            </div>
        </div>
    );
};

export default ContainerActions;
