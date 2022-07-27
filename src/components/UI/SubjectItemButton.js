import React from "react";
import "./SubjectItemButton.module.css"
import {useHistory} from "react-router-dom";


const SubjectItemButton = (props) => {
    const {new_default_meta} = window.contract;
    const history = useHistory();

    const moveToExamHandler = () => {

        const initContract = async () => {
            await new_default_meta({owner_id: window.accountId}).then((data) => {
                if ( data !== undefined || data !== null) {
                    history.push(props.path)
                }

            })

        }
        initContract();
    }
    return (
        <div
            onClick={moveToExamHandler}
            className="col-xl-5 col-md-5 col-sm-5 img-btn img-cover "
            style={{
                backgroundImage: `url(${props.image})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '230px',
                padding: '2px',
            }}></div>
    )
}

export default SubjectItemButton;