
import React, {useEffect,useState} from "react";
//import {useDispatch} from 'react-redux';
import axios from 'axios';
//import {useState} from 'react';
//import React from "react";
//import React ,{useEffect} from 'react';




function F() {
    //const dispatch=useDispatch();
    //const code=null;
    const [code,setCode]=useState(500);
    const [data,setData]=useState(0);
    useEffect(()=>{
            axios.post('https://missedliunian.com/api/user/login',{
                username:'test',
                password:'456789'
            })
                .then(function (response) {
                    console.log(response);
                    // console.log(response.data);
                    // console.log(response.code);
                    //const {itme,setItem}=useState(4);
                    //setCode(response.data);
                    setData(response.data);
                    //code=response.code;
                })
                .catch(function (error) {
                    console.log(error);

                });
        },[]

    );
    return(
        //this.response.data;
        <div>{data}</div>


    );
}

export default F;








