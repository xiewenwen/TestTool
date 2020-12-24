import React, {useState} from 'react';
import {Form, Input, Button} from 'antd';


const Child = (props) => {
    const {handleGetChildData, index} = props;
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };
    const onFinish = values => {
        handleGetChildData(values, index);
        console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

const Word = () => {
    const [data, setData] = useState([]);
    const handleGetChildData = (item, index) => {
        const temp = data;
        temp[index] = item;
        setData(temp);
        console.log("data", data);
    };

    return (
        <>
            {[0, 1, 2].map((value, index) => <Child index={index} key={index} handleGetChildData={handleGetChildData}/>)}
        </>
    );
};


export default Word;