// import React from 'react';
import ReactDom from 'react-dom';
import React, {useEffect,useState} from "react";
//import {useDispatch} from 'react-redux';
import axios from 'axios';
import {Form, Input, Button, Select, DatePicker, InputNumber, Radio, message} from 'antd';

class Mytest extends React.Component{

    //定义state的值
    state ={name:'xiewenwen',password:'100'};
    render(){
        //render中可修改stata的值
        this.state.name='zhangxiaojing';
        this.state.password='nishishui';
        const handleCreateTaskSubmit = (values) => {
            console.log(values.username)
            console.log(values.password)
            axios.post('http://localhost:8080/login/user',{
                username:values.username,
                password:values.password,
            }).then(function (response) {})
                .catch(function (error) {
                    console.log(error);
                });
        };


        return(
            <div>
                {/*//返回修改的的值*/}
                {/*<span>{this.state.name}</span>*/}
                {/*{this.state.name},{this.state.password}*/}
                {/*<form>*/}
                {/*<input value={this.state.name}/>*/}
                {/*<input value={this.state.password}/>*/}
                {/*<button onClick={this.test(this.state.name,this.state.password)}>提交</button>*/}
                {/*</form>*/}

                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                    size={'middle'}
                    style={{marginTop: 30}}
                    onFinish={handleCreateTaskSubmit}
                >
                    <Form.Item label="username" name="username"
                               rules={[{
                                   required: true,
                                   message: '名字',
                                   pattern: /^(\w|[\u4e00-\u9fa5]){1,50}$/,
                                   whitespace: true
                               }]}>
                        <Input placeholder="请输入名字"/>
                    </Form.Item>
                    <Form.Item label="password" name="password"
                               rules={[{
                                   required: true,
                                   message: '密码',
                                   pattern: /^(\w|[\u4e00-\u9fa5]){1,50}$/,
                                   whitespace: true
                               }]}>
                        <Input placeholder="密码"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 4}}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>


                </Form>



            </div>
        );
    }
}
export default Mytest;