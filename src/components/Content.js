import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Notification from "./UI/Notification";
import Article from "./Article";
import LoadingSpinner from "./UI/LoadingSpinner";
import ArticleContext from "../store/article-context";

let isLoaded = true;

const Content = (props) => {
    const {
        get_tickets,
        set_user_collection_answers,
        increment,
        set_current_result,
    } = window.contract;
    const {setRequestStatus, answers} = useContext(ArticleContext);
    const [stateResultMessage, setStateResultMessage] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [buttonDisabledState, setButtonDisabledState] = useState(false);
    const [successState, setSuccessState] = useState(false);
    let [ticketsState, setTicketsState] = useState([]);
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
            await get_tickets({account_id: window.accountId})
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
                await set_user_collection_answers({account_id: window.accountId})
                    .then((data) => {
                        set_current_result({
                            account_id: window.accountId,
                            answers: answers,
                        }).then((data) => {
                            const {ok, message} = data
                            setStateResultMessage(ok)
                            console.log(message)
                        })
                    })
            }
            setCollectionOfAnswers();
        }
    }, [success]);

    const getResultsHandler = async (event) => {
        event.preventDefault()
        const {ok, message} = await increment({account_id: window.accountId})

        console.log(message)
        setRequestStatus(ok);

        history.push('/results')
    };

    const buttonDisabled = (buttonDisabled, success) => {
        setButtonDisabledState(buttonDisabled)
        setSuccessState(success)
    }
    const articles = ticketsState.map((content, index) =>
        <Article
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
            {articles}
            { success && stateResultMessage &&
                <div>
                    <p>Congrats! You pass test! </p>
                    <button
                        className='btn btn-success'
                        onClick={getResultsHandler}>Get results
                    </button>
                </div>}
            {
                showNotification &&
                <Notification networkId={props.networkId}/>}
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