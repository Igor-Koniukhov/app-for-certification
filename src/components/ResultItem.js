import React from "react";

const ResultItem = (props) => {

    return (
        <div className="d-flex flex-row justify-content-between border mt-1"
             style={{paddingLeft: "10px", paddingRight: "10px"}}
        >
            <div className="col-2 flex-column">
                <div style={{marginRight: "auto"}}> {props.artickle}/{props.questionId}</div>
            </div>
            <div className="col-4k text-center">{props.your_answer}</div>
            <div className="col-4 text-center">{props.correct_answer}</div>
            <div style={{color: props.pass ? 'green' : 'red', marginLeft: "5px",}}
                 className="col-1 ">
                {props.pass ? ' Passed' : ' Failed'}
            </div>
        </div>
    )
}

export default ResultItem;