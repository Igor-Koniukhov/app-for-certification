import React, {useContext, useEffect, useState} from "react";
import ArticleContext from "../store/article-context";

const QuestionItems = (props) => {
    const artCtx = useContext(ArticleContext);
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [shufledAnswers, setShufledAnswers] = useState([])

    const answer = {
        id: "",
        article_id: "",
        your_answer: "",
        correct_answer: "",
        pass: false
    }

    const [answerState, setAnswerState] = useState(answer)
    const onChangeHandler = (e) => {
        setButtonDisabled(true);
        answer.id = props.id
        answer.article_id = props.article
        answer.your_answer = e.target.value
        answer.correct_answer = props.correct
        setAnswerState(answer)
        artCtx.article_id = props.article
        artCtx.addAnswer(answer, props.article, props.id);

        if (answer.your_answer.trim() === answer.correct_answer.trim()) {
            answer.pass = true
        }
    }

    let answers = props.answers
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)

    useEffect(() => {
        setShufledAnswers(answers)
    }, [])


    return (
        <ol>
            <h3>{props.index + 1}. {props.question}</h3>
            {shufledAnswers.map((a, i) =>
                <li key={i}><label htmlFor={props.id + "-" + i}>{a}</label>
                    <input
                        className={props.id + "-" + "checked"}
                        id={props.id + "-" + i}
                        type="radio"
                        value={a}
                        onChange={onChangeHandler}
                        disabled={buttonDisabled}
                    /></li>)}
            {props.isAllChoosen && answerState.pass &&
                <div style={{color: 'green'}}><p>Success! Your answer - {answerState.your_answer}</p>
                    <p>Correct answer - {answerState.correct_answer}</p>
                </div>}
            {props.isAllChoosen && !answerState.pass && answerState.your_answer.trim().length > 0 &&
                <div><p style={{color: 'red'}}>Fail! Your answer - {answerState.your_answer}</p>
                    <p style={{color: 'green'}}>Correct answer - {answerState.correct_answer}</p>
                </div>}
        </ol>
    )
}

export default QuestionItems;