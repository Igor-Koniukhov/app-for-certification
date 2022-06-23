import React, {Fragment} from "react";

import Notification from "./Notification";
import FormForAnswer from "./FormForAnswer";
import Article from "./Article";

const Content = (props)=> {
    const [greeting, set_greeting] = React.useState()
    const [showNotification, setShowNotification] = React.useState(false)
    const submitHandler = async (event) => {
        event.preventDefault()
        const {fieldset, greeting} = event.target.elements
        const newGreeting = greeting.value
        fieldset.disabled = true

        try {
            await window.contract.set_greeting({
                message: newGreeting
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
        set_greeting(newGreeting)
        setShowNotification(true)
        setTimeout(() => {
            setShowNotification(false)
        }, 11000)
    };
    React.useEffect(
        () => {
            if (window.walletConnection.isSignedIn()) {
                window.contract.get_greeting({account_id: window.accountId})
                    .then(greetingFromContract => {
                        set_greeting(greetingFromContract)
                    })
            }
        },
        []
    )
    return (
        <Fragment>
            <button className="link" style={{float: 'right'}} onClick={props.logout}>
                Sign out
            </button>
                <h1> You log in: {window.accountId} - {greeting} </h1>
               <FormForAnswer submitHandler={submitHandler} greeting={greeting}/>
                <Article/>
            {showNotification && <Notification networkId={props.networkId}/>}
        </Fragment>
    )
}

export default Content;