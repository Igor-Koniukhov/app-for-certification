import React, {Fragment} from "react";
import {useHistory} from "react-router-dom";
const Home = ()=>{
    const {new_default_meta} = window.contract;
    const history = useHistory();
    const moveToExamHandler = ()=>{
        const initContract = async ()=>{
            await new_default_meta({owner_id: window.accountId}).then((data)=>{
                console.log(data)
            })
        }
        initContract();

        history.push('/exam')

    }
    return (
        <Fragment>
            <button className="btn btn-warning" onClick={moveToExamHandler}>Move to exame</button>
        </Fragment>
    )

}

export default Home;