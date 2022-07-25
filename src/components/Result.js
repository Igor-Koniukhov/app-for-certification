import React from "react";

const Result = (props) => {

    return (
        <div>
            <span> {props.index + 1}) </span>
            <span> Article: {props.artickle}</span>
            <span> Question: {props.questionId}</span>
            <span> Your answer: {props.your_answer}</span>
            <span> Correct answer: {props.correct_answer}</span>
            <span style={{color: props.pass ? 'green' : 'red'}}>
                    {props.pass ? ' Passed' : ' Failed'}
                </span>
        </div>
    )
}

export default Result;