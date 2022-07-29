import React from "react";

const Notification =(props)=>{
    const urlPrefix = `https://explorer.${props.networkId}.near.org/accounts`
    return (
                <aside style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginLeft: 'auto',
                    position: "fixed",
                    zIndex: 100,
                    bottom: 0,
                    right: 0,
                    width: '100%',
                    backgroundColor: 'green'

                }}>
                    <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
                        {window.accountId}
                    </a>
                    <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
                        {window.contract.contractId}
                    </a>
                    <footer>
                        <div>✔ Succeeded</div>
                    </footer>
                </aside>
    )
}

export default Notification;