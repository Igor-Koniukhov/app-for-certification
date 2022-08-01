import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Notification from "./UI/Notification";
import Article from "./Article";
import LoadingSpinner from "./UI/LoadingSpinner";
import ArticleContext from "../store/article-context";

let isLoaded = true;

const Content = (props) => {
    const {
        get_tickets_by_subject_name,
        increment,
        set_current_result,
    } = window.contract;
    const cnx = useContext(ArticleContext);
    const [stateResultMessage, setStateResultMessage] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [buttonDisabledState, setButtonDisabledState] = useState(false);
    const [successState, setSuccessState] = useState(false);
    let [ticketsState, setTicketsState] = useState([]);
    const [stateGettingResult, setStateGettingResult]=useState('Get results')
    const history = useHistory();
    const success = successState && buttonDisabledState;
    const ticketError = ticketsState === null || ticketsState === undefined
    if (ticketError) {
        ticketsState = [];
    }
    const isTicketLoad = ticketsState.length === 0;
    const isTicketSucceed = !ticketError && !isTicketLoad



    useEffect(() => {
        const getTickets = async () => {
            await get_tickets_by_subject_name({name: props.subjectName})
                .then((data) => {
                    setTicketsState(data)
                })
        };
        getTickets();
    }, [isLoaded, ticketsState.length]);


    useEffect(() => {
        if (isLoaded) {
            isLoaded = false;
            return
        }
    }, [isLoaded]);


    useEffect(() => {
        if (success) {
            const setCollectionOfAnswers = async () => {
                 await set_current_result({
                    account_id: window.accountId,
                     subject_name: props.subjectName,
                    answers: cnx.answers,
                    attempt: cnx.attempt,
                }).then((data) => {
                        if (data.ok){
                            setStateResultMessage(true)
                        }
                    })
            }
            setCollectionOfAnswers();
        }
    }, [success]);

    const getResultsHandler = async (event) => {
        event.preventDefault()
        setStateGettingResult('getting...')
        const {ok, message} = await increment({account_id: window.accountId})
        console.log(message)
        cnx.setRequestStatus(ok);


        history.push('/results')
    };

    const buttonDisabled = (buttonDisabled, success) => {
        setButtonDisabledState(buttonDisabled)
        setSuccessState(success)
    }
    const articles = ticketsState.map((content, index) =>
        <Article
            subJectName={props.subjectName}
            article={content.article}
            key={content.article}
            source={content}
            index={index}
            buttonDisabled={buttonDisabled}
            setShowNotification={setShowNotification}
        />
    )

    return (
        <div className="container pb-5 pt-5 wrapper">
            <h1>{props.subjectName.toUpperCase()}</h1>
            {articles}
            { success && stateResultMessage &&
                <div>
                    <button
                        className='btn btn-success mt-4'
                        onClick={getResultsHandler}>{ success ? stateGettingResult : 'Got'}
                    </button>
                </div>}
            {
                showNotification  &&
                <Notification />}
            {
                !isTicketSucceed &&
                (
                    <div className='backdrop'>
                        <LoadingSpinner/>
                    </div>
                )}
            {success && !stateResultMessage &&
                (
                    <div className='backdrop'>
                        <LoadingSpinner/>
                    </div>
                )
            }
        </div>
    )
}

export default Content;