import React, {useContext, useEffect, useState} from "react";
import QuestionItems from "./QuestionItems";
import ArticleContext from "../store/article-context";


const Article = (props) => {
    const {
        set_answer,
    } = window.contract;

    const {tickets} = props.source;
    const artCtx = useContext(ArticleContext);
    const filteredAnswers = artCtx.answers.filter(answer => answer.article_id === props.article);
    const questionLength = tickets.length
    const answersLength = filteredAnswers.length
    const buttonDisabled = questionLength !== answersLength
    const [shuffledQuestionsState, setShuffledQuestions] = useState([])
    const numberOfQuestions = artCtx.numberOfQuestions
    const numberOfAnswers = artCtx.answers.length
    const isSuccess = numberOfQuestions === numberOfAnswers
    const [buttonDisabledState, setButtonDisabledState] = useState(buttonDisabled)




    let shuffledQuestions = tickets
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)

    useEffect(() => {
        setShuffledQuestions(shuffledQuestions)
        artCtx.getNumbersOfQuestions(shuffledQuestionsState.length)
    }, [shuffledQuestionsState.length]);

    useEffect(() => {
        setButtonDisabledState(buttonDisabled)
    }, [buttonDisabled]);

    const sentMessage = async (answer) => {
        try {
            await set_answer({
                id: answer.id,
                article_id: answer.article_id,
                your_answer: answer.your_answer,
                correct_answer: answer.correct_answer,
                pass: answer.pass,
            })
        } catch (e) {
            alert(
                'Something went wrong! ' +
                'Maybe you need to sign out and back in? ' +
                'Check your browser console for more info.'
            )
            throw e
        } finally {
            setButtonDisabledState(true)
            props.buttonDisabled(true, isSuccess)
            console.log('SENT!')
        }
    };
    const handlerSubmit = async (event) => {
        event.preventDefault();

        const sentTicket = async () => {
            filteredAnswers.forEach((answer, i) => {
                sentMessage(answer)
            })
            props.setShowNotification(true);
            const setTimeNotification = setTimeout(() => {
                props.setShowNotification(false);
            }, 4000);
            clearTimeout(setTimeNotification);
        };
        await sentTicket();
    }

    const list = shuffledQuestionsState.map((item, index) =>
        <QuestionItems
            article={props.article}
            index={index}
            key={item.id}
            id={item.id}
            question={item.question}
            options={item.options}
            correct_answer={item.correct_answer}
            isAllChoosen={!buttonDisabledState}
        />
    )
    return (
        <form onSubmit={handlerSubmit}>
            <h1>{props.source.title}</h1>
            <p>{props.source.content}</p>
            {list}
            <button
                id={`button-${props.article}`}
                disabled={buttonDisabledState}>
                Send result
            </button>
        </form>
    )

}

export default Article;