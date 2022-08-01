import React, {useState} from "react";
import "./SubjectItemButton.module.css"
import {useHistory} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";


const SubjectItemButton = (props) => {
    const [stateSpinner, setStateSpinner] = useState(false);
    const history = useHistory();


    const moveToExamHandler = () => {
        setStateSpinner(true)
        history.push(props.path)
        setStateSpinner(false)


    }
    let title = props.path.substring(1).toUpperCase();

    return (
        <div
            className="col-xl-5 col-md-5 col-sm-5 img-btn  "
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + `/` + props.image})`,
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