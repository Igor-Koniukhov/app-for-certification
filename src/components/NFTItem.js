import React from "react";

const NFTItem = (props) => {
    return (
        <div
            className="col-lg-4 col-md-4 col-sm-6 d-flex flex-column"

        >
            <strong className="text-center">{props.d.title}</strong>
            <details style={{textAlign: "justify"}}>
                <summary>description:</summary>
                <p style={{fontSize: "14px"}}>{props.d.description}</p>
            </details>
            <img src={props.d.media}/>
        </div>
    )
}

export default NFTItem;