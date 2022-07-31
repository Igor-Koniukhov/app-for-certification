import React from "react";

const Notification =()=>{

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

                        {window.accountId}


                        {window.contract.contractId}

                    <footer>
                        <div>✔ Succeeded</div>
                    </footer>
                </aside>
    )
}

export default Notification;