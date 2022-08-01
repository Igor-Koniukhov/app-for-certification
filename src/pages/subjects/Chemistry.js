import React  from "react";
import {useHistory} from "react-router-dom";
import Content from "../../components/Content";

const Chemistry = (props)=>{
    const history = useHistory();
    let subjectName = history.location.pathname.substring(23);
    console.log(subjectName, " sub name")

    return (
        <Content
            subjectName={subjectName}
            isLoad ={props.isLoad}
        />
    )
}

export default Chemistry;