import React from "react";
import { nanoid } from "nanoid";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import PlayAgain from "./components/PlayAgain";
import "./App.css";
//

function App() {
    const [gameOn, setGameOn] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [testFinished, setTestFinished] = React.useState(false);
    const [questionsArr, setQuestionsArr] = React.useState([]);

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then((res) => res.json())
            .then((data) => {
                setQuestionsArr(data.results);
            });
    }, []);

    const startGame = () => {
        setGameOn(true);
    };

    const selectAnswer = (e) => {
        e.target.classList.add("selected-answer");
        const question = e.target.parentNode.parentNode.id.textContent;
    };

    const checkAnswers = () => {
        const answersElements = document.querySelectorAll(".selected-answer");
        if (answersElements.length === questionsArr.length) {
            const answers = [];
            answersElements.forEach((element) => {
                answers.push(element.textContent);
            });
            setTestFinished(true);
        }
        // const answersElements = document.querySelectorAll(".selected-answer");
        // if (answersElements.length === questionsArr.length) {
        //     const answers = [];
        //     answersElements.forEach((element) => {
        //         answers.push(element.textContent);
        //     });
        //     for (let i = 0; i < answers.length; i++) {
        //         if (answers[i] === questionsArr[i].correct_answer) {
        //             answersElements[i].classList.toggle("selected-answer");
        //             answersElements[i].classList.toggle("correct");
        //         } else {
        //             answersElements[i].classList.toggle("selected-answer");
        //             answersElements[i].classList.toggle("incorrect");
        //         }
        //     }
        // }
    };

    const getScore = () => {
        const correctAnswers = document.querySelectorAll(".correct");
        let total = 0;
        correctAnswers.forEach((ans) => {
            total++;
        });
        setScore(total);
    };

    const resetGame = () => {};

    const questionsElements = questionsArr.map((Q) => {
        if (!testFinished) {
            // // Shuffle answers
            const randNum = Math.floor(
                Math.random() * Q.incorrect_answers.length
            );
            const shuffledAnswers = [];
            Q.incorrect_answers.forEach((ans) => {
                shuffledAnswers.push(ans);
            });
            shuffledAnswers.splice(randNum, 0, Q.correct_answer);
            Q.answers = shuffledAnswers;

            return (
                <Question
                    key={nanoid()}
                    id={nanoid()}
                    question={Q.question}
                    answers={Q.answers}
                    handleClick={selectAnswer}
                />
            );
        } else {
            return (
                <Question
                    key={nanoid()}
                    id={nanoid()}
                    question={Q.question}
                    answers={Q.answers}
                    handleClick={selectAnswer}
                />
            );
        }
    });

    return (
        <div className='container'>
            {gameOn ? (
                questionsElements
            ) : (
                <StartScreen handleClick={startGame} />
            )}

            {gameOn && (
                <div className='container-actions'>
                    {testFinished && <p>jake</p>}
                    <button
                        className='check-btn btn'
                        onClick={!testFinished ? checkAnswers : resetGame}
                    >
                        {!testFinished ? "Check Answers" : "Play Again"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
