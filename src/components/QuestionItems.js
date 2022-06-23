import React, {useState} from "react";

const QuestionItems = (props) => {

    const answers = {
        id: "",
        your_answer: "",
        correct_answer: "",
        pass: false

    }
    const [answerState, setAnswerState]=useState(answers)
    const onChangeHandler = (e) => {
        console.log(props.id, " this is id")

        answers.id = props.id
        answers.your_answer = e.target.value
        answers.correct_answer = props.correct
        setAnswerState(answers)


        if (answers.your_answer.trim() === answers.correct_answer.trim()) {
            answers.pass = true
            console.log(" true", answers)
        } else {
            console.log()
        }

    }


    return (
        <ol>
            <h3>{props.index + 1}. {props.question}</h3>
            {props.answers.map((a, i) =>
                <li key={i}><label htmlFor={props.id + "-" + i}>{a}</label>
                    <input className={props.id + "-"+"checked"} id={props.id + "-" + i} type="radio" value={a} onChange={onChangeHandler} /></li>)}
            {answerState.pass && <div style={{color:'green'}}><p>Success! Your answer - {answerState.your_answer}</p>
                <p>Correct answer - {answerState.correct_answer}</p>
            </div>}
            {!answerState.pass && answerState.your_answer.trim().length >0 && <div><p style={{color: 'red'}}>Fail! Your answer - {answerState.your_answer}</p>
                    <p style={{color:'green'}}>Correct answer - {answerState.correct_answer}</p>
            </div>}

        </ol>
    )
}

export default QuestionItems;