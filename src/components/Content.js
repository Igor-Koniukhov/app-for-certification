import React, {Fragment, useContext, useEffect, useState} from "react";
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
        get_user_collection_answers,
        increment,
    } = window.contract;
    const {setRequestStatus} = useContext(ArticleContext);
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

    useEffect(() => {
        const getTickets = async () => {
            await get_tickets().then((data) => {
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

    const isTicketLoad = ticketsState.length === 0;
    const isTicketSucceed = !ticketError && !isTicketLoad

    useEffect(() => {
        if (success) {
            const setCollectionOfAnswers = async () => {
                await set_user_collection_answers().then((data) => {
                    console.log(data, 'set_user_collection_answers')
                })
            }
            setCollectionOfAnswers();
        }
    }, [success]);


    const getCertificateHandler = async (event) => {
        event.preventDefault()

        await get_user_collection_answers().then((data) => {
            console.log(data, 'get_user_collection_answers')
        })
        const {ok, message} = await increment({args: {}})
        console.log(ok, message, " ok")
        setRequestStatus(ok);
        history.push('/certificate')
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
        <Fragment>
            {articles}
            {
                success &&
                <div>
                    <p>Congrats! You pass test! </p>
                    <button onClick={getCertificateHandler}>Get certificate!</button>
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
        </Fragment>
    )
}

export default Content;