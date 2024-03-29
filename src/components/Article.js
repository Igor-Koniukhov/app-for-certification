import React, {useContext, useEffect, useState} from "react";
import QuestionItems from "./QuestionItems";
import ArticleContext from "../store/article-context";


const Article = (props) => {
    const {
        set_answer,
        get_num
    } = window.contract;

    const {tickets} = props.source;
    const cnx = useContext(ArticleContext);
    const filteredAnswers = cnx.answers.filter(answer => answer.article_id === props.article);
    const questionLength = tickets.length
    const answersLength = filteredAnswers.length
    const buttonDisabled = questionLength !== answersLength
    const [shuffledQuestionsState, setShuffledQuestions] = useState([])
    const numberOfAnswers = cnx.answers.length
    const isSuccess = cnx.numberOfQuestions === numberOfAnswers
    const [buttonDisabledState, setButtonDisabledState] = useState(buttonDisabled)
    const [stateStatusSending, setStateStatusSending] = useState('sent')
    const [stateButtonColor, setStateButtonColor]= useState('btn btn-secondary me-2')
    const [stateAttempt, setStateAttempt]=useState(0);

    useEffect(()=>{
        const getAttempt = async()=>{
            await get_num({account_id: window.accountId}).then((data)=>{
                setStateAttempt(data)
            })
        }
        getAttempt()
    }, [stateAttempt])


    let shuffledQuestions = tickets
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)

    useEffect(() => {
        setShuffledQuestions(shuffledQuestions)
        cnx.getNumbersOfQuestions(shuffledQuestionsState.length)
    }, [shuffledQuestionsState.length]);

    useEffect(() => {
        setButtonDisabledState(buttonDisabled)
    }, [buttonDisabled]);

    const sentMessage = async (answers) => {
        try {
            await set_answer({
                subject_name: props.subJectName,
                attempt: stateAttempt,
                article: cnx.article,
                answers: answers,
                account_id: window.accountId,
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
        const sentAnswers = async () => {
               await sentMessage(filteredAnswers)

            props.setShowNotification(true);
            setTimeout(() => {
                props.setShowNotification(false);
            }, 4000);
        };
        await sentAnswers();
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
    const sendEventHandler = () => {
        setStateStatusSending('sending...')
        setStateButtonColor('btn btn-warning me-2')
    }
    return (
        <form onSubmit={handlerSubmit}>
            <h1>{props.source.title}</h1>
            <p>{props.source.content}</p>
            {list}
            <button
                className={`${!buttonDisabledState ? stateButtonColor :  buttonDisabled ? stateButtonColor :'btn btn-success me-2'}`}
                id={`button-${props.article}`}
                disabled={buttonDisabledState}
                onClick={sendEventHandler}
            >
                { !buttonDisabledState ? stateStatusSending : buttonDisabled ? stateStatusSending :'succeed!'}
            </button>
        </form>
    )

}

export default Article;