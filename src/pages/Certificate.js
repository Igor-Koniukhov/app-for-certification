import React, {Fragment, useContext, useEffect, useState} from "react";
import './Certificate.module.css';
import ArticleContext from "../store/article-context";
import Result from "../components/Result";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Certificate = () => {
    const {isLoaded} = useContext(ArticleContext);
    let [stateAnswers, setStateAnswers] = useState([])
    const {
        get_user_collection_answers
    } = window.contract;
    const answerError = stateAnswers === null || stateAnswers === undefined;
    const isAnswersGot = !answerError && stateAnswers.length > 0;

    if (answerError) {
        stateAnswers = []
    }

    const getAnswers = async () => {
        await get_user_collection_answers({account_id: window.accountId}).then((data) => {
            setStateAnswers(data)
        })
    }
    useEffect(() => {
        getAnswers()
    }, [isLoaded]);

    let passed = stateAnswers.filter((value) =>
        value.pass === true
    )
    let notPassed = stateAnswers.filter((value) =>
        value.pass === false
    )


    const resultPassed = passed.map((answer, index) =>
        <Result
            index={index}
            key={index}
            artickle={answer.article_id}
            questionId={answer.id}
            your_answer={answer.your_answer}
            correct_answer={answer.correct_answer}
            pass={answer.pass}

        />
    )
    const resultFailed = notPassed.map((answer, index) =>
        <Result
            index={index}
            key={index}
            artickle={answer.article_id}
            questionId={answer.id}
            your_answer={answer.your_answer}
            correct_answer={answer.correct_answer}
            pass={answer.pass}
        />
    )

    let content = isAnswersGot ?
        <Fragment>
            <h1>Results</h1>
            {resultPassed.length!==0 && <h3>Passed answers: </h3>}
            {resultPassed}
            {resultFailed.length !== 0 && <h3>Not passed answers: </h3>}
            {resultFailed}
        </Fragment> :
        <div className='backdrop'>
            <LoadingSpinner/>
        </div>


    return <div className="container">
        {content}
    </div>
}

export default Certificate;