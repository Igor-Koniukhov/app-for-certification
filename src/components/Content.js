import React, {Fragment, useContext, useEffect, useState} from "react";
import {logout} from "../utils";
import Notification from "./Notification";
import FormForAnswer from "./FormForAnswer";
import SourceQ from "./SourceQ";
import Article from "./Article";
import ArticleContext from "../store/article-context";

const Content = (props) => {
    const [greeting, setGreeting] = useState()
    const [showNotification, setShowNotification] = useState(false)
    const [buttonDisabledState, setButtonDisabledState]=useState(false)
    const [successState, setSuccessState]=useState(false)

    const artCtx = useContext(ArticleContext);

    const submitHandler = async (event) => {
        event.preventDefault()
        const {fieldset, greeting} = event.target.elements
        const newGreeting = greeting.value
        fieldset.disabled = true

        try {
            await window.contract.set_greeting({
                message: JSON.stringify(artCtx.answers)
            })
        } catch (e) {
            alert(
                'Something went wrong! ' +
                'Maybe you need to sign out and back in? ' +
                'Check your browser console for more info.'
            )
            throw e
        } finally {
            fieldset.disabled = false
        }

        setGreeting(JSON.parse(newGreeting))
        setShowNotification(true)
        setTimeout(() => {
            setShowNotification(false)
        }, 11000)
    };


    useEffect(
        () => {
            if (window.walletConnection.isSignedIn()) {
                window.contract.get_greeting({account_id: window.accountId})
                    .then(greetingFromContract => {
                        setGreeting(greetingFromContract)
                    })
            }
        },
        []
    )
    const buttonDisabled =(buttonDisabled, success)=>{
        setButtonDisabledState(buttonDisabled)
        setSuccessState(success)
    }
    const articles = SourceQ.map((content, index) =>
        <Article
            article={content.article}
            key={content.article}
            source={content}
            index={index}
            buttonDisabled={buttonDisabled}
        />
    )

    return (
        <Fragment>
            <button className="link" style={{float: 'right'}} onClick={logout}>
                Sign out
            </button>

            {articles}
            {successState && buttonDisabledState && <div>
                <p>Congrats! You pass test! </p>
                <button>Get certificate!</button>
            </div>}

            <FormForAnswer submitHandler={submitHandler} greeting={greeting}/>
            <h1> You log in: {window.accountId} - {greeting} </h1>
            {showNotification && <Notification networkId={props.networkId}/>}
        </Fragment>
    )
}

export default Content;