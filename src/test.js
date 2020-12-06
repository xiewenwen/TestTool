import React, {useEffect,useState} from "react";
import ReactDom from 'react-dom';

function Test() {
    // state={domian:'xww',age:'34'}
    const user = {
        firstName: 'Harper',
        lastName: 'Perez'
    };
    const element = (
        <h1>
            {/*<div>{this.state.domian}</div>*/}
            Hello, {user.firstName},{user.lastName}!
        </h1>
    );
    return (

        element
        // <div>{this.state.domian}</div>
    );

}
export default Test;