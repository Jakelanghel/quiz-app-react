import React from "react";

const ContainerActions = (props) => {
    return (
        <div className='container-actions'>
            <button className='main-menu-btn' onClick={props.backToMenu}>
                main menu
            </button>
            {props.quizData.errors && (
                <p className='msg error-msg'>
                    please answer ALL questions to continue ! ! !
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
                {props.quizData.quizComplete ? "Play Again" : "Check Answers"}
            </button>
        </div>
    );
};

export default ContainerActions;
