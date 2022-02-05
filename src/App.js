import React from "react";
import { nanoid } from "nanoid";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import "./App.css";

const App = () => {
    const [questionsArr, setQuestionsArr] = React.useState([]);
    const [gameOn, setGameOn] = React.useState(false);
    const [quizComplete, setQuizComplete] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [newQuestionsCount, setNewQuestionsCount] = React.useState(0);

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then((res) => res.json())
            .then((data) => {
                setQuestionsArr(() => {
                    // Create answers list and shuffle correct answer into list so that it
                    // dose not get put into the same spot in each question
                    return data.results.map((Q) => {
                        const randNum = Math.floor(
                            Math.random() * Q.incorrect_answers.length
                        );
                        const shuffledAnswers = [];
                        Q.incorrect_answers.forEach((ans) =>
                            shuffledAnswers.push(ans)
                        );
                        shuffledAnswers.splice(randNum, 0, Q.correct_answer);
                        Q.shuffledAnswers = shuffledAnswers;
                        // Add selectedAnswer property to each question OBJ in questionsArr
                        Q.selectedAnswer = "";
                        // Add unique ID to each question OBJ in questionsArr
                        Q.id = nanoid();
                        Q.error = false;
                        return Q;
                    });
                });
            });
    }, [newQuestionsCount]);
    // console.log(questionsArr);

    // ==========================
    // FUNCTIONS ================
    // ==========================

    const startQuiz = () => {
        setGameOn(true);

        // setQuestionsArr((oldState) => {
        //     return oldState.map((Q) => {
        //         const randNum = Math.floor(
        //             Math.random() * Q.incorrect_answers.length
        //         );
        //         const shuffledAnswers = [];
        //         Q.incorrect_answers.forEach((ans) => shuffledAnswers.push(ans));
        //         shuffledAnswers.splice(randNum, 0, Q.correct_answer);
        //         Q.shuffledAnswers = shuffledAnswers;
        //         Q.selectedAnswer = "";
        //         Q.id = nanoid();
        //         return Q;
        //     });
        // });
    };

    const selectAnswer = (e) => {
        const selected = e.target.textContent;
        const id = e.target.id;
        setQuestionsArr((oldState) => {
            return oldState.map((Q) => {
                if (Q.id === id) {
                    console.log(Q.selectedAnswer);
                    if (Q.selectedAnswer === "") {
                        return { ...Q, selectedAnswer: selected };
                    } else {
                        return { ...Q, selectedAnswer: "" };
                    }
                } else {
                    return Q;
                }
            });
        });
    };

    const checkAnswers = () => {
        let answersCount = 0;
        questionsArr.forEach((Q) => {
            Q.selectedAnswer !== "" && answersCount++;
        });
        if (answersCount === questionsArr.length) {
            let score = 0;
            questionsArr.forEach((Q) => {
                Q.correct_answer === Q.selectedAnswer && score++;
            });
            // If all questions are answered flip error property back to false
            setQuestionsArr((oldState) => {
                return oldState.map((Q) => {
                    return { ...Q, error: false };
                });
            });
            setScore(score);
            setQuizComplete(true);
        } else {
            // If all questions are NOT answered flip error property on questions that
            // were not answered to true
            setQuestionsArr((oldState) => {
                return oldState.map((Q) => {
                    return Q.selectedAnswer === "" ? { ...Q, error: true } : Q;
                });
            });
        }
    };

    const resetGame = () => {
        setNewQuestionsCount((oldState) => oldState + 1);
        setScore(0);
        setQuizComplete(false);
    };

    const questionElements = questionsArr.map((Q) => {
        return (
            <Question
                key={nanoid()}
                id={Q.id}
                shuffledAnswers={Q.shuffledAnswers}
                selectedAnswer={Q.selectedAnswer}
                correctAnswer={Q.correct_answer}
                question={Q.question}
                handleClick={selectAnswer}
                score={score}
            />
        );
    });

    const errors = questionsArr.map((Q) => Q.error);

    return (
        <div className='container'>
            {!gameOn ? (
                <StartScreen handleClick={startQuiz} />
            ) : (
                questionElements
            )}

            {gameOn && (
                <div className='container-actions'>
                    {quizComplete && (
                        <p className='msg score-msg'>
                            {`you scored ${score} / ${questionsArr.length} correct answers.`}
                        </p>
                    )}
                    {errors.indexOf(true) !== -1 && (
                        <p className='msg error-msg'>
                            please answer ALL questions to continue ! ! !
                        </p>
                    )}
                    <button
                        className='check-btn btn'
                        onClick={quizComplete ? resetGame : checkAnswers}
                    >
                        {quizComplete ? "Play Again" : "Check Answers"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;
