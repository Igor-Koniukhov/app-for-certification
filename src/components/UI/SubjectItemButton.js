import React, {useState} from "react";
import "./SubjectItemButton.module.css"
import {useHistory} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";


const SubjectItemButton = (props) => {
    const {new_default_meta} = window.contract;
    const history = useHistory();
    const [stateSpinner, setStateSpinner] = useState(false);

    const moveToExamHandler = () => {
        setStateSpinner(true)
        const initContract = async () => {
            await new_default_meta({owner_id: window.accountId}).then((data) => {
                if (data !== undefined || data !== null) {
                    setStateSpinner(false)
                    history.push(props.path)
                }
            })

        }

        initContract();
    }
    let title = props.path.substring(1).toUpperCase();

    return (
        <div
            className="col-xl-5 col-md-5 col-sm-5 img-btn  "
            style={{
                backgroundImage: `url(${props.image})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '230px',
                padding: '2px',
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                position: 'relative',
                margin: '3px',
            }}>
            <div className="img-cover">
                {stateSpinner &&
                    <LoadingSpinner/>
                }

            </div>
            <div className="button-title">  {title}</div>
            <div className="handler" onClick={moveToExamHandler}></div>


        </div>
    )
}

export default SubjectItemButton;