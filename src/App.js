import React from "react";
import StartScreen2 from "./components/StartScreen";
import TitleCard from "./components/TitleCard";
import Question from "./components/Question";
import ContainerActions from "./components/ContainerActions";
import ContainerBackground from "./components/ContainerBackground";
import { nanoid } from "nanoid";
import "./App.css";

const App = () => {
    // ======================
    // State ================
    // ======================

    const [quizData, setQuizData] = React.useState({
        quizStarted: false,
        quizComplete: false,
        questionsArr: [],
        category: "",
        difficulty: "",
    });

    const [url, setUrl] = React.useState(
        "https://opentdb.com/api.php?amount=5&type=multiple&encode=base64"
    );

    const [allCategories, setCategories] = React.useState({});

    const [quizCount, setQuizCount] = React.useState(1);

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
                const questions = shuffleAnswers(decodedData);
                setQuizData((oldData) => ({
                    ...oldData,
                    questionsArr: questions,
                    score: 0,
                    quizComplete: false,
                    errors: false,
                    category: decodedData[0].category,
                    difficulty: decodedData[0].difficulty,
                }));
            });
    }, [url, quizCount]);

    // console.log(quizData);

    // ======================
    // FUNCTIONS ============
    // ======================

    const decodeData = (arr) => {
        const newArr = JSON.parse(JSON.stringify(arr));
        const decodedData = newArr.map((obj) => {
            const decodedObj = {};
            for (let key in obj) {
                if (key !== "incorrect_answers") {
                    decodedObj[key] = atob(obj[key]);
                } else {
                    const incorrectAns = [];
                    obj[key].forEach((ans) => {
                        const answer = atob(ans);
                        incorrectAns.push(answer);
                    });
                    decodedObj[key] = incorrectAns;
                }
            }

            return decodedObj;
        });
        return decodedData;
    };

    const shuffleAnswers = (arr) => {
        const questions = arr.map((q) => {
            const incorrectArr = q.incorrect_answers.map((ans) => ans);
            const randIndex = Math.floor(Math.random() * 3);
            const correctAns = q.correct_answer;
            incorrectArr.splice(randIndex, 0, correctAns);
            const question = Object.assign({}, q, {
                shuffledAnswers: incorrectArr,
                selectedAnswer: "",
                id: nanoid(),
            });
            return question;
        });
        return questions;
    };

    // START QUIZ ======================
    // =================================

    const startQuiz = () => {
        const category = getCategory();
        const difficulty = getDifficulty();
        const quizLength = getQuizLength();
        // console.log(category);
        // console.log(difficulty);
        console.log(quizLength);

        let url = `https://opentdb.com/api.php?${quizLength}${category}${difficulty}&type=multiple&encode=base64`;

        const X =
            "https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple&encode=base64";

        const x =
            "https://opentdb.com/api.php?&amount=109&difficulty=hard&type=multiple&encode=base64";

        // console.log(url);

        setUrl(url);

        setQuizData((oldData) => {
            return {
                ...oldData,
                quizStarted: true,
            };
        });
    };

    const getCategory = () => {
        const categoryValue = document.querySelector(".categories").value;
        // console.log(categoryValue);
        let category = "";
        if (categoryValue !== "any") {
            const catId = allCategories.find((cat) => {
                return cat.name === categoryValue;
            }).id;
            category = `&category=${catId}`;
        }
        return category;
    };

    const getDifficulty = () => {
        const difficultyValue = document.querySelector(".difficulty").value;
        const difficulty =
            difficultyValue !== "Any" ? `&difficulty=${difficultyValue}` : "";
        return difficulty;
    };

    const getQuizLength = () => {
        const quizLengthValue = document.querySelector(".quiz-length").value;
        const quizLength = `&amount=${quizLengthValue}`;
        return quizLength;
    };

    //  QUESTION-ELEMENTS ==============
    // =================================

    const createQuestionElements = (quizData) => {
        return quizData.questionsArr.map((Q, i) => {
            return (
                <Question
                    key={nanoid()}
                    id={Q.id}
                    error={Q.error}
                    quizComplete={quizData.quizComplete}
                    shuffledAnswers={Q.shuffledAnswers}
                    selectedAnswer={Q.selectedAnswer}
                    correctAnswer={Q.correct_answer}
                    question={Q.question}
                    handleClick={selectAnswer}
                    answerClassName={Q.answerClassName}
                    category={quizData.category}
                    questionCount={i + 1}
                />
            );
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

    // CONTAINER-ACTIONS-FUNCTIONS =====
    // =================================

    const gradeQuiz = () => {
        const quizCompleted = checkForErrors();
        if (quizCompleted) {
            const quizScore = getScore();
            setQuizData((oldData) => ({
                ...oldData,
                quizComplete: true,
                errors: false,
                score: quizScore,
            }));
        }
    };

    const checkForErrors = () => {
        const allQuestionsAnswered = quizData.questionsArr.every(
            (Q) => Q.selectedAnswer !== ""
        );

        if (!allQuestionsAnswered) {
            setQuizData((oldData) => {
                return {
                    ...oldData,
                    errors: true,
                };
            });
        }
        return allQuestionsAnswered;
    };

    const getScore = () => {
        let quizScore = 0;
        quizData.questionsArr.forEach((Q) => {
            if (Q.selectedAnswer === Q.correct_answer) {
                quizScore += 1;
            }
        });
        return quizScore;
    };

    const backToMenu = () => {
        resetGame();
        setQuizData((oldState) => {
            return {
                ...oldState,
                quizStarted: false,
            };
        });
    };

    const resetGame = () => {
        setQuizCount((oldCount) => (oldCount += 1));
    };

    // =============================
    // VARIABLES ===================
    // =============================

    const questionElements = createQuestionElements(quizData);
    const errors = quizData.questionsArr.map((Q) => (Q.error ? true : false));

    return (
        <div className='container'>
            {!quizData.quizStarted ? (
                <StartScreen2
                    handleClick={startQuiz}
                    categories={allCategories}
                />
            ) : (
                <div className='main'>
                    <ContainerBackground>
                        <TitleCard
                            difficulty={quizData.difficulty}
                            category={quizData.category}
                        />
                    </ContainerBackground>

                    <div className='container-questions'>
                        {questionElements}
                    </div>
                </div>
            )}

            {quizData.quizStarted && (
                <ContainerBackground>
                    <ContainerActions
                        backToMenu={backToMenu}
                        resetGame={resetGame}
                        gradeQuiz={gradeQuiz}
                        errors={errors}
                        quizData={quizData}
                        score={quizData.score}
                    />
                </ContainerBackground>
            )}
        </div>
    );
};

export default App;
