import React from "react";
import {useHistory} from "react-router-dom";
import Content from "../components/Content";

const Microbiology = (props)=>{
    const history = useHistory();
    let subjectName = history.location.pathname.substring(1);

    return (
        <Content
            subjectName={subjectName}
            isLoad = {props.isLoad}
        />
    )
}

export default Microbiology;