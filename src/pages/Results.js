import React, {Fragment, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import './Certificate.module.css';
import ArticleContext from "../store/article-context";
import ResultItem from "../components/ResultItem";
import LoadingSpinner from "../components/UI/LoadingSpinner";



const Certificate = () => {
    const history = useHistory();
    const {isLoaded, setCollectionAnswers} = useContext(ArticleContext);
    let [stateAnswers, setStateAnswers] = useState([])
    const [stateResult, setStateResult]=useState({})
    const [stateSubjectName, setStateSubjectName]=useState('');
    const [stateAttemptId, setStateAttemptId]=useState('');
    const {
        get_answers_by_attempt_id,
        get_current_result,
    } = window.contract;
    const answerError = stateAnswers === null || stateAnswers === undefined;
    const isAnswersGot = !answerError && stateAnswers.length > 0;

    if (answerError) {
        stateAnswers = []
    }
    useEffect(()=>{
        const getResults = async ()=>{
            await get_current_result({account_id: window.accountId})
                .then((data) => {
                setStateResult(data)
                    setStateSubjectName(data.subject_name);
                    setStateAttemptId(data.attempt_id)
            })
        }
        getResults();

    }, [isLoaded])

    useEffect(()=>{
        const getAndSetAnswers= async()=>{
            get_answers_by_attempt_id({attempt_id: stateAttemptId}).then((data)=>{
                setStateAnswers(data)
                setCollectionAnswers(data)
            })
        }
        getAndSetAnswers()
    }, [stateAttemptId])


    let passed = stateAnswers.map(array=> array.filter((answer)=>
        answer.pass ===true
    ))

    let notPassed = stateAnswers.map(array=> array.filter((answer)=>
        answer.pass ===false
    ))

const getCertificateHandler = ()=>{
        history.push('/certificate');
}
    const resultPassed = passed.map((data) =>
        data.map((answer, index)=>
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
        data.map((answer, index)=>
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

    return <div className="container">
        <Fragment>
            <h1 className="text-capitalize">{stateSubjectName} test results:</h1>
            <div className="d-flex flex-row justify-content-between border">
                <div className="col-2 flex-column" style={{marginRight: "auto"}}>
                     ArticleId/QuestionId
                </div>
                <div className="col-4"> Your answer: </div>
                <div className="col-4"> Correct answer: </div>
                <div style={{ marginLeft: "5px",}}
                     className="col-1"
                >
                      result
                </div>
            </div>
            {
                isAnswersGot ?
                <Fragment>
                    {resultPassed.length !== 0 && <h3>Passed answers: </h3>}
                    {resultPassed}
                    {resultFailed.length !== 0 && <h3>Not passed answers: </h3>}
                    {resultFailed}
                    {!stateResult.is_valid &&<button className="btn btn-warning mt-3" onClick={getCertificateHandler}>Get Certificate</button>}
                </Fragment> :
                <div className='backdrop'>
                    <LoadingSpinner/>
                </div>
            }

        </Fragment>

    </div>
}

export default Certificate;