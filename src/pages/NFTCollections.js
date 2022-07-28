import React, {useContext} from "react";
import ArticleContext from "../store/article-context";


const NFTCollections = () => {
    const {metadata, attempt} = useContext(ArticleContext);


    return (
        <div className="container">
            {
                metadata.map((data) =>
                    data.map((d) =>
                        <div className="row">
                            <div className="col-4 d-flex justify-content-center flex-column"
                            >
                                <h3>{d.title}</h3>
                                <p>{d.description}</p>
                                <img src={d.media} />
                            </div>
                        </div>
                    )
                )

            }
        </div>
    )
}
export default NFTCollections;