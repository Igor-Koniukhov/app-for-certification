import React, {Fragment} from "react";
import SourceQ from "./SourceQ";
import QuestionItems from "./QuestionItems";


const Article = () => {
    const source = SourceQ;
    const list = source.map((item, index) =>
        <QuestionItems
            index={index}
            key={item.id}
            id={item.id}
            question={item.question}
            answers={item.answers}
            correct={item.correct}

        />);
    const handlerSubmit = (event) => {
        event.preventDefault();
        alert("hello")

    }

    return (
        <Fragment>
            <form onSubmit={handlerSubmit}>
                {list}
                <button>Submit</button>
            </form>


        </Fragment>

    )

}

export default Article;