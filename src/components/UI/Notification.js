import React from "react";

const Notification =(props)=>{
    const urlPrefix = `https://explorer.${props.networkId}.near.org/accounts`
    return (
                <aside>
                    <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
                        {window.accountId}
                    </a>
                    {' '/* React trims whitespace around tags; insert literal space character when needed */}
                    called method: 'set_answers' in contract:
                    {' '}
                    <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
                        {window.contract.contractId}
                    </a>
                    <footer>
                        <div>✔ Succeeded</div>
                        <div>Just now</div>
                    </footer>
                </aside>
    )
}

export default Notification;