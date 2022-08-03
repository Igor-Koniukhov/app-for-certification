import React, {useContext, useState, useEffect} from "react";
import ArticleContext from "../store/article-context";
import NFTItem from "../components/NFTItem";


const NFTCollections = () => {
    const {get_token_metadata}=window.contract
    const [stateTokenMetadata, setStateTokenMetadata]=useState([])
    const {isMeta} = useContext(ArticleContext);
    console.log(stateTokenMetadate)

    useEffect(() => {
        const getTokenMetadata = async () => {
            await get_token_metadata({account_id: window.accountId}).then((data) => {
                if (data.length !==0 ){
                    setStateTokenMetadata(data)
                }
            })
        }
        getTokenMetadata();

    }, [isMeta])

    let nft =  stateTokenMetadata.map((data, index) =>
            <NFTItem key={index} d={data}/>
    )

    return (
        <div className="container">
            <div className="row">
            {
               nft
            }
            </div>
        </div>
    )
}
export default NFTCollections;