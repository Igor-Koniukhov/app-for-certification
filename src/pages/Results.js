import React, {Fragment, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import './Certificate.module.css';
import ArticleContext from "../store/article-context";
import ResultItem from "../components/ResultItem";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Certificate = () => {
    const history = useHistory();
    const {isLoaded} = useContext(ArticleContext);
    let [stateAnswers, setStateAnswers] = useState([])
    const [stateResult, setStateResult] = useState({})
    const [stateSubjectName, setStateSubjectName] = useState('');
    const [stateAttemptId, setStateAttemptId] = useState('');
    const {
        get_answers_by_attempt_id,
        get_current_result,
    } = window.contract;
    const answerError = stateAnswers === null || stateAnswers === undefined;
    const isAnswersGot = !answerError && stateAnswers.length > 0;

    if (answerError) {
        stateAnswers = []
    }
    useEffect(() => {
        const getResults = async () => {
            await get_current_result({account_id: window.accountId})
                .then((data) => {
                    setStateResult(data)
                    setStateSubjectName(data.subject_name);
                    setStateAttemptId(data.attempt_id)
                })
        }
        getResults();

    }, [isLoaded])

    useEffect(() => {
        const getAndSetAnswers = async () => {
            get_answers_by_attempt_id({attempt_id: stateAttemptId}).then((data) => {
                setStateAnswers(data)
            })
        }

        getAndSetAnswers()
    }, [stateAttemptId])


    let passed = stateAnswers.map(array => array.filter((answer) =>
        answer.pass === true
    ))

    let notPassed = stateAnswers.map(array => array.filter((answer) =>
        answer.pass === false
    ))


    const getCertificateHandler = () => {
        history.push('/certificate');
    }
    const resultPassed = passed.map((data) =>
        data.map((answer, index) =>
            <ResultItem
                index={index}
                key={index}
                artickle={answer.article_id}
                questionId={answer.id}
                your_answer={answer.your_answer}
                correct_answer={answer.correct_answer}
                pass={answer.pass}

            />
        )
    )
    const resultFailed = notPassed.map((data) =>
        data.map((answer, index) =>
            <ResultItem
                index={index}
                key={index}
                artickle={answer.article_id}
                questionId={answer.id}
                your_answer={answer.your_answer}
                correct_answer={answer.correct_answer}
                pass={answer.pass}

            />
        )
    )

    return <div style={{width: "100%", marginLeft: "auto", marginRight: "auto"}}>
        <Fragment>
            <h1 className="text-capitalize">{stateSubjectName} test results:</h1>
            <h2 className="text-center">Score: {stateResult.score}</h2>
            <p>*Id=ArticleId/QuestionId</p>
            <div className="d-flex flex-row justify-content-between border"
                 style={{paddingLeft: "10px", paddingRight: "10px"}}
            >
                <div className="col-2 flex-column" style={{marginRight: "auto"}}>
                    Id
                </div>
                <div className="col-4">Your answers</div>
                <div className="col-4">Correct answers</div>
                <div style={{marginLeft: "5px",}}
                     className="col-1"
                >
                    result
                </div>
            </div>
            {
                isAnswersGot ?
                    <Fragment>
                        {resultPassed.length !== 0 && <h3 className="text-center">Passed answers: </h3>}
                        {resultPassed}
                        {resultFailed.length !== 0 && <h3 className="text-center">Not passed answers: </h3>}
                        {resultFailed}
                        {stateResult.is_valid &&
                            <button className="btn btn-warning mt-3 d-block mx-auto" onClick={getCertificateHandler}>Get
                                Certificate</button>}
                        {!stateResult.is_valid &&
                            <p className="text-center mt-3 "
                               style={{color: "red"}}
                            >Required min number of score for getting a certificate - 70. Try it the next time. </p>}
                    </Fragment> :
                    <div className='backdrop'>
                        <LoadingSpinner/>
                    </div>
            }
        </Fragment>
    </div>
}

export default Certificate;