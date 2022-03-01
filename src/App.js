import React from "react";
import StartScreen from "./components/StartScreen";
import StartScreen2 from "./components/StartScreen_2";
import Question from "./components/Question";

import { nanoid } from "nanoid";

import "./App.css";

const Ap = () => {
    // ============================================
    // STATE ======================================
    // ============================================
    const [quizData, setQuizData] = React.useState({
        quizStarted: false,
        quizComplete: false,
        questionsArr: [],
        category: "",
        difficulty: "",
    });

    const [quizCount, setQuizCount] = React.useState(1);

    const [allCategories, setCategories] = React.useState({});

    const [url, setUrl] = React.useState(
        "https://opentdb.com/api.php?amount=10&type=multiple&encode=base64"
    );

    React.useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.trivia_categories);
            });
    }, []);

    React.useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const decodedData = decodeData(data.results);
                const shuffledAnswersArr = decodedData.map((Q) => {
                    const arr = Q.incorrect_answers;
                    arr.push(Q.correct_answer);
                    return arr;
                });

                const questions = decodedData.map((Q, i) => {
                    return {
                        ...Q,
                        shuffledAnswers: shuffledAnswersArr[i],
                        selectedAnswer: "",
                        id: nanoid(),
                        error: false,
                    };
                });

                setQuizData((oldData) => ({
                    ...oldData,
                    questionsArr: questions,
                    score: 0,
                    quizComplete: false,
                }));
            });
    }, [url]);

    // ============================================
    // FUNCTIONS ==================================
    // ============================================

    const decodeData = (arr, data) => {
        // console.log(arr);
        const decoded = [];
        arr.forEach((obj) => {
            const decodedObj = {};
            for (let key in obj) {
                if (Array.isArray(obj[key])) {
                    const arr = obj[key];
                    // console.log(arr);
                    const decodedArr = arr.map((i) => atob(i));
                    const objKey = key;
                    decodedObj[objKey] = decodedArr;
                } else {
                    const objKey = key;
                    const decodedStr = atob(obj[key]);
                    decodedObj[objKey] = decodedStr;
                }
            }
            decoded.push(decodedObj);
        });
        return decoded;
    };

    const startQuiz = () => {
        const categoryValue = document.querySelector(".categories").value;
        const difficultyValue = document.querySelector(".difficulty").value;
        if (categoryValue && difficultyValue !== "Any") {
            for (let cat of allCategories) {
                if (cat.name === categoryValue) {
                    const category = `category=${cat.id}`;
                    const difficulty = `difficulty=${difficultyValue}`;
                    setUrl(
                        `https://opentdb.com/api.php?amount=10&${category}&${difficulty}&type=multiple&encode=base64`
                    );
                }
            }
        } else if (categoryValue !== "Any") {
            for (let cat of allCategories) {
                if (cat.name === categoryValue) {
                    const category = `category=${cat.id}`;
                    setUrl(
                        `https://opentdb.com/api.php?amount=10&${category}&difficulty=easy&type=multiple&encode=base64`
                    );
                }
            }
        } else if (difficultyValue !== "Any") {
            const difficulty = `difficulty=${difficultyValue}`;
            setUrl(
                `https://opentdb.com/api.php?amount=10&${difficulty}&type=multiple&encode=base64`
            );
        } else {
            setUrl(
                `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&encode=base64`
            );
        }
        for (let cat of allCategories) {
            if (cat.name === categoryValue) {
                const category = `category=${cat.id}`;
            }
        }

        setQuizData((oldData) => {
            return {
                ...oldData,
                quizStarted: true,
            };
        });
    };

    const handleResponse = (arr) => {
        const decodedData = decodeData(arr);
        const shuffledAnswers = shuffleAnswers(decodedData);
    };

    const shuffleAnswers = (decodedData) => {
        const shuffledAnswersArr = decodedData.map((Q) => {
            const arr = Q.incorrect_answers;
            arr.push(Q.correct_answer);
            return arr;
        });

        const questions = decodedData.map((Q, i) => {
            return {
                ...Q,
                shuffledAnswers: shuffledAnswersArr[i],
                selectedAnswer: "",
                id: nanoid(),
                error: false,
            };
        });
    };

    const resetGame = () => {
        setQuizCount((oldCount) => (oldCount += 1));
    };

    const backToMenu = () => {
        setQuizData((oldState) => {
            return {
                ...oldState,
                quizStarted: false,
            };
        });
    };

    const selectAnswer = (e) => {
        const answerElement = e.target;
        const id = e.target.id;
        const selectedAns = e.target.textContent;

        setQuizData((oldData) => {
            const updatedQuestionsArr = oldData.questionsArr.map((Q) => {
                return Q.id === id
                    ? {
                          ...Q,
                          selectedAnswer: selectedAns,
                          answerClassName: "answer selected-answer",
                      }
                    : Q;
            });
            return { ...oldData, questionsArr: updatedQuestionsArr };
        });
        answerElement.classList.toggle("selected-answer");
    };

    const gradeQuiz = () => {
        const quizCompleted = quizData.questionsArr.every(
            (Q) => Q.selectedAnswer
        );
        markAnswers(quizCompleted);
        quizCompleted && getScore();
    };

    const markAnswers = (quizComplete) => {
        if (!quizComplete) {
            setQuizData((oldQuestions) => {
                const updatedQuestionsArr = quizData.questionsArr.map((Q) => {
                    return Q.selectedAnswer === "" ? { ...Q, error: true } : Q;
                });
                return {
                    ...oldQuestions,
                    questionsArr: updatedQuestionsArr,
                };
            });
        } else {
            setQuizData((oldData) => {
                const updatedQuestionsArr = oldData.questionsArr.map((Q) => {
                    if (Q.selectedAnswer === Q.correct_answer) {
                        return {
                            ...Q,
                            answerClassName: "answer correct",
                            error: false,
                        };
                    } else {
                        return {
                            ...Q,
                            answerClassName: "answer incorrect",
                            error: false,
                        };
                    }
                });
                return {
                    ...oldData,
                    questionsArr: updatedQuestionsArr,
                    quizComplete: true,
                };
            });
        }
    };

    const getScore = () => {
        let quizScore = 0;
        quizData.questionsArr.forEach((Q) => {
            if (Q.selectedAnswer === Q.correct_answer) {
                quizScore += 1;
            }
        });
        setQuizData((oldData) => {
            return {
                ...oldData,
                score: quizScore,
            };
        });
    };

    // ============================================
    // VARIABLES ==================================
    // ============================================

    const errors = quizData.questionsArr.map((Q) => (Q.error ? true : false));

    const questionElements = quizData.questionsArr.map((Q) => {
        return (
            <Question
                key={nanoid()}
                id={Q.id}
                error={Q.error}
                shuffledAnswers={Q.shuffledAnswers}
                selectedAnswer={Q.selectedAnswer}
                correctAnswer={Q.correct_answer}
                question={Q.question}
                handleClick={selectAnswer}
                answerClassName={Q.answerClassName}
            />
        );
    });

    return (
        <div className='container'>
            {!quizData.quizStarted ? (
                <StartScreen2
                    handleClick={startQuiz}
                    categories={allCategories}
                />
            ) : (
                <div className='container-questions'>{questionElements}</div>
            )}

            {quizData.quizStarted && (
                <div className='container-actions'>
                    <button className='main-menu-btn' onClick={backToMenu}>
                        main menu
                    </button>
                    {errors.indexOf(true) !== -1 && (
                        <p className='msg error-msg'>
                            please answer ALL questions to continue ! ! !
                        </p>
                    )}
                    {quizData.quizComplete && (
                        <p className='msg score-msg'>
                            {`you scored ${quizData.score} / ${quizData.questionsArr.length} correct answers.`}
                        </p>
                    )}

                    <button
                        className='check-btn btn'
                        onClick={quizData.quizComplete ? resetGame : gradeQuiz}
                    >
                        {quizData.quizComplete ? "Play Again" : "Check Answers"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Ap;
