import React, {useContext, useState, useEffect} from "react";
import ArticleContext from "../store/article-context";


const NFTCollections = () => {
    const {get_token_metadate}=window.contract
    const [stateTokenMetadate, setStateTokenMetadate]=useState([])
    const {isMeta} = useContext(ArticleContext);

    useEffect(() => {
        const getTokenMetadata = async () => {
            await get_token_metadate({}).then((data) => {
                setStateTokenMetadate(data)


            })
        }
        getTokenMetadata();

    }, [isMeta])

    return (
        <div className="container">
            <div className="row">
            {
                stateTokenMetadate.map((data, index) =>
                    data.map((d) =>
                            <div key={index} className="col-4 d-flex justify-content-center flex-column">
                                <h3>{d.title}</h3>
                                <p>{d.description}</p>
                                <img src={d.media} />
                            </div>
                    )
                )
            }
            </div>
        </div>
    )
}
export default NFTCollections;