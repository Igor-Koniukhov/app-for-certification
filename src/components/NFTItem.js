import React from "react";

const NFTItem =(props)=>{
    return (
        <div className="col-4 d-flex justify-content-center flex-column">
            <h3>{props.d.title}</h3>
            <p>{props.d.description}</p>
            <img src={props.d.media} />
        </div>
    )
}

export default NFTItem;