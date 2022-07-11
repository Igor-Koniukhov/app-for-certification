import React, {Fragment, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import Notification from "./UI/Notification";
import Article from "./Article";
import LoadingSpinner from "./UI/LoadingSpinner";


const Content = (props) => {
    const {
        get_answers,
        get_tickets
    } = window.contract
    const {isLoad} = props
    const [showNotification, setShowNotification] = useState(false);
    const [buttonDisabledState, setButtonDisabledState] = useState(false);
    const [successState, setSuccessState] = useState(false);
    const [ticketsState, setTicketsState] = useState([]);
    const history = useHistory();


    useEffect(() => {
        const getTickets = async () => {
            await get_tickets().then((data) => {
                setTicketsState(data)
            })
        };
        getTickets();
    }, [isLoad]);


    const getCertificateHandler = async (event) => {
        event.preventDefault()
        await get_answers().then((data) => {
            console.log(data)
        });
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
                successState &&
                buttonDisabledState &&
                <div>
                    <p>Congrats! You pass test! </p>
                    <button onClick={getCertificateHandler}>Get certificate!</button>
                </div>}

            {
                showNotification &&
                <Notification networkId={props.networkId}/>}
            {
                ticketsState.length === 0 &&
                (
                    <div className='backdrop'>
                        <LoadingSpinner/>
                    </div>
                )}
        </Fragment>
    )
}

export default Content;