import {Tabs, Form, Input, Button, Select, Space, Checkbox, InputNumber, Radio} from 'antd';
import React, {Component, useState} from 'react';
import {FormInstance} from 'antd/lib/form';
import axios from "axios";
import Name from "./name";
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import './caseform.css'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },

};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const divStyle={
    width:800
};

const ChildDel= (props) => {
    const {field, remove} = props;

    return(
        <div key={field.key}>
            <Form.Item name={[field.name, 'zdStatu']} fieldKey={[field.fieldKey, 'zdStatu']} label="状态"
                       rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={[field.name, 'isDel']} fieldKey={[field.fieldKey, 'isDel']} label="是否可删除"
                       rules={[{required: true}]}>
                <Radio.Group>
                    <Radio value={'0'}>可删除</Radio>
                    <Radio value={'1'}>不可删除</Radio>
                </Radio.Group>
            </Form.Item>
            <MinusCircleOutlined onClick={() => remove(field.name)}/>

        </div>
    )
}

function DelForm(props) {
    const [form] = Form.useForm();
    const handleChange = () => {
        form.setFieldsValue({sights: []});
    };
    const onFinish = values => {
        console.log('Received values of form:', values);
        console.log(values);
        axios.post('http://localhost:8080/login/user', {
            testCase: values,
        }).then(function (response) {
        })
            .catch(function (error) {
                console.log(error);
            });
    };

    const onReset = () => {
        // resetFields();
    };

    return (
        <div style={divStyle}>
            <Form form={form} {...layout} layout="horizontal"  name="control-ref" onFinish={onFinish}>
                <Form.Item name="testBefore" label="前置条件" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.List name="sights" >
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map((field, index) => <ChildDel field={field} key={index} remove={remove}/>)}

                            <Form.Item {...tailLayout}>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    新增字段
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        生成
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        重置
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )

}
export default DelForm;