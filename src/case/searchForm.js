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

const Child= (props) => {
    // const [show, setShow] = useState(1)
    const [valueShow, setValueShow] = useState(1)
    const [valueRadio, setValueRadio] = useState('input');
    const [value, setValue] = useState();
    const {field, remove} = props;

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValueRadio(e.target.value);
        if (valueRadio === 'input') {
            setValueShow(2);
        } else {
            setValueShow(1);
        }
        console.log(valueRadio)
    };

    return(
        <div key={field.key}>
            <Form.Item name={[field.name, 'ziduan']} fieldKey={[field.fieldKey, 'ziduan']} label="状态"
                       rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={[field.name, 'input']} fieldKey={[field.fieldKey, 'input']} label="文本框类型"
                       rules={[{required: true}]}>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={'input'}>文本框</Radio>
                    <Radio value={'select'}>选择框</Radio>
                </Radio.Group>
            </Form.Item>
            {valueShow===1?<Form.Item name={[field.name,'zdValue']} fieldKey={[field.fieldKey,'zdValue']} label="选择框值"
            ><Input/></Form.Item>:null}
            <MinusCircleOutlined onClick={() => remove(field.name)}/>

        </div>
    )
}

function SearchForm(props) {
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
                            {fields.map((field, index) => <Child field={field} key={index} remove={remove}/>)}
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
export default SearchForm;