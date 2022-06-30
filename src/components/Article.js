import React, {useContext, useEffect, useState} from "react";
import QuestionItems from "./QuestionItems";
import ArticleContext from "../store/article-context";


const Article = (props) => {
    const artCtx = useContext(ArticleContext);
    const filteredAnswers = artCtx.answers.filter(answer => answer.article_id === props.article);
    const questionLength = props.source.questions.length
    const answersLength = filteredAnswers.length
    const buttonDisabled = questionLength !== answersLength
    const [shufledQuestionsState, setShufledQuestions] = useState([])
    const numberOfQuestions = artCtx.numberOfQuestions
    const numberOfAnswers = artCtx.answers.length
    const isSuccess = numberOfQuestions===numberOfAnswers


    const [buttonDisabledState, setButtonDisabledState]=useState(buttonDisabled)

    let shufledQuestions = props.source.questions
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)


    useEffect(() => {
        setShufledQuestions(shufledQuestions)
        artCtx.getNumbersOfQuestions(shufledQuestionsState.length)
    }, [shufledQuestionsState.length]);

    useEffect(()=>{
            setButtonDisabledState(buttonDisabled)

    },[buttonDisabled])

    const handlerSubmit = async (event) => {
        event.preventDefault();
        console.log(filteredAnswers, props.article, " filteredanswers")
        setButtonDisabledState(true)
        props.buttonDisabled(true, isSuccess)
    }

    const list = shufledQuestionsState.map((item, index) =>
        <QuestionItems
            article={props.article}
            index={index}
            key={item.id}
            id={item.id}
            question={item.question}
            answers={item.answers}
            correct={item.correct}
            isAllChoosen={!buttonDisabledState}
        />
    )
    return (
        <form onSubmit={handlerSubmit}>
            <h1>{props.source.title}</h1>
            <p>{props.source.content}</p>
            {list}
            <button id={`button-${props.article}`} disabled={buttonDisabledState}>Send result</button>
        </form>
    )

}

export default Article;