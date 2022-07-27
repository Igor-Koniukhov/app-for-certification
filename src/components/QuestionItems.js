import React, {useContext, useEffect, useState} from "react";
import ArticleContext from "../store/article-context";
import './QuestionItem.module.css'

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
    const onChangeHandler = (e) => {
        setButtonDisabled(true);
        answer.id = props.id
        answer.article_id = props.article
        answer.your_answer = e.target.value
        answer.correct_answer = props.correct_answer
        artCtx.article_id = props.article
        artCtx.addAnswer(answer, props.article, props.id);

        if (answer.your_answer.trim() === answer.correct_answer.trim()) {
            answer.pass = true
        }
    }

    let answers = props.options
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
                <li key={i}>
                    <input
                        className={props.id + "-" + "checked"}
                        id={props.id + "-" + i}
                        type="radio"
                        value={a}
                        onChange={onChangeHandler}
                        disabled={buttonDisabled}
                    />
                    <label style={{paddingLeft: '10px'}} htmlFor={props.id + "-" + i}>{a}</label>
                </li>)}

        </ol>
    )
}

export default QuestionItems;