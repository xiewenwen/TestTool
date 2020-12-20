import {Tabs, Form, Input, Button, Select,Space, Checkbox, InputNumber,Radio} from 'antd';
import React, {Component, useState} from 'react';
import {FormInstance} from 'antd/lib/form';
import SiderDemo from "../main";
import axios from "axios";
import Name from "./name";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './caseform.css'

const {TabPane} = Tabs;
// const {Option} = Select;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const options = [
    {label: '非空校验', value: 'notNull'},
    {label: '唯一性校验', value: 'only'},
    {label: '是否数值', value: 'isNum'},
    {label: '长度校验', value: 'range'},
    {label: '可编辑', value: 'edit'},
];
const { Option } = Select;

const areas = [
    { label: 'Beijing', value: 'Beijing' },
    { label: 'Shanghai', value: 'Shanghai' },
];

const sights = {
    Beijing: ['Tiananmen', 'Great Wall'],
    Shanghai: ['Oriental Pearl', 'The Bund'],
};

// const formItemLayout = {
//     labelCol: {
//         xs: { span: 24 },
//         sm: { span: 4 },
//     },
//     wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 20 },
//     },
// };
// const formItemLayoutWithOutLabel = {
//     wrapperCol: {
//         xs: { span: 24, offset: 0 },
//         sm: { span: 20, offset: 4 },
//     },
// };


function CaseForm(props) {
    const [show, setShow] = useState(1)
    const [valueShow,setValueShow] = useState(1)
    const {setFieldsValue, resetFields} = props;
    const [form] = Form.useForm();
    const [valueRadio, setValueRadio] = useState('input');
    const [value,setValue] = useState();

    const handleChange = () => {
        form.setFieldsValue({ sights: [] });
    };

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValueRadio(e.target.value);
        if (valueRadio ==='input'){
            setValueShow(2);
        }else{
            setValueShow(1);
        }
        console.log(valueRadio)
    };

    const onShowNum = (value) => {
        console.log('ssssssssss',value)
        setValue(value);
        if (value.includes("range")){
            setShow(2);
            console.log('kkkkkkkkkkkkk',value);
        }
        else{
            setShow(1);
        }
        console.log(show)
    };

    // const onGenderChange = value => {
    //     switch (value) {
    //         case 'male':
    //             setFieldsValue({note: 'Hi, man!'});
    //             break;
    //         case 'female':
    //             setFieldsValue({note: 'Hi, lady!'});
    //             break;
    //         case 'other':
    //             setFieldsValue({note: 'Hi there!'});
    //             break;
    //         default:
    //             break;
    //     }
    // };

    const onFinish = values => {
        console.log('Received values of form:', values);
        console.log(values);
        axios.post('http://localhost:8080/login/user',{
            testCase:values,
        }).then(function (response) {})
            .catch(function (error) {
                console.log(error);
            });
    };

    const onReset = () => {
        // resetFields();
    };

    return (
        <div><Tabs defaultActiveKey="1" centered>
            <TabPane tab="新增/编辑" key="1" >
                {/*Content of Tab Pane 1*/}
                <Form form={form} {...layout} name="control-ref" onFinish={onFinish}>
                    <Form.Item name="testBefore" label="前置条件" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.List name="sights">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(field => (
                                    <Space key={field.key} align="baseline">
                                        <Form.Item name={[field.name, 'ziduan']} fieldKey={[field.fieldKey, 'ziduan']} label="字段" rules={[{required: true}]}>
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item name={[field.name, 'input']} fieldKey={[field.fieldKey, 'input']} label="文本框类型" rules={[{required: true}]}>
                                            <Radio.Group onChange={onChange} value={value}>
                                                <Radio value={'input'}>文本框</Radio>
                                                <Radio value={'select'}>选择框</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item name={[field.name, 'testpoint']} fieldKey={[field.fieldKey, 'testpoint']} label="测试点">
                                            <Checkbox.Group options={options} onChange={onShowNum}/>
                                        </Form.Item>
                                        {show === 2 ?
                                            <div><Form.Item name={[field.name, 'min']} fieldKey={[field.fieldKey, 'min']} label='最小'><InputNumber name="min"></InputNumber></Form.Item>
                                                <Form.Item name={[field.name, 'max']} fieldKey={[field.fieldKey, 'max']} label='最大'><InputNumber name="max"></InputNumber></Form.Item></div>:null}
                                        {valueShow === 2 ?
                                            <Form.Item name={[field.name, 'values']} fieldKey={[field.fieldKey, 'values']} label='可选值'>
                                                <Input/>
                                            </Form.Item> :null}
                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                                        >
                                            {({getFieldValue}) => {
                                                return getFieldValue('gender') === 'other' ? (
                                                    <Form.Item
                                                        name="customizeGender"
                                                        label="Customize Gender"
                                                        rules={[{required: true}]}
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                ) : null;
                                            }}
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        新增字段
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                        {/*{getFieldDecorator('content[${index}].ziduanl', {*/}

                        {/*})(<Name></Name>)}*/}

                        {/*{getFieldDecorator('content[${index}].ziduanl', {*/}

                        {/*})(<Name></Name>)}*/}
                        {/*<Form.Item name="ziduan1">*/}
                        {/*    <Name></Name>*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item name="ziduan2">*/}
                        {/*    <Name></Name>*/}
                        {/*</Form.Item>*/}


                    {/*<Form.Item name="ziduan" label="字段" rules={[{required: true}]}>*/}
                    {/*    <Input/>*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item name="inputType" label="文本框类型" rules={[{required: true}]}>*/}
                    {/*    <Radio.Group onChange={onChange} value={value}>*/}
                    {/*        <Radio value={'input'}>文本框</Radio>*/}
                    {/*        <Radio value={'select'}>选择框</Radio>*/}
                    {/*    </Radio.Group>*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item name="tiaojian" label="测试点">*/}
                    {/*    <Checkbox.Group options={options} onChange={onShowNum}/>*/}
                    {/*</Form.Item>*/}
                    {/*{show === 2 ?*/}
                    {/*    <div><Form.Item name='min' label='最小'><InputNumber name="min"></InputNumber></Form.Item>*/}
                    {/*        <Form.Item name='max' label='最大'><InputNumber name="max"></InputNumber></Form.Item></div>:null}*/}
                    {/*{valueShow === 2 ?*/}
                    {/*    <Form.Item name='values' label='可选值'>*/}
                    {/*        <Input/>*/}
                    {/*    </Form.Item> :null}*/}
                    {/*<Form.Item*/}
                    {/*    noStyle*/}
                    {/*    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}*/}
                    {/*>*/}
                    {/*    {({getFieldValue}) => {*/}
                    {/*        return getFieldValue('gender') === 'other' ? (*/}
                    {/*            <Form.Item*/}
                    {/*                name="customizeGender"*/}
                    {/*                label="Customize Gender"*/}
                    {/*                rules={[{required: true}]}*/}
                    {/*            >*/}
                    {/*                <Input/>*/}
                    {/*            </Form.Item>*/}
                    {/*        ) : null;*/}
                    {/*    }}*/}
                    {/*</Form.Item>*/}

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            生成
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            重置
                        </Button>
                        {/*<Button type="link" htmlType="button" onClick={onFill}>*/}
                        {/*    Fill form*/}
                        {/*</Button>*/}
                    </Form.Item>
                </Form>
            </TabPane>
            <TabPane tab="删除" key="2">
            </TabPane>
            <TabPane tab="查询" key="3">
                Content of Tab Pane 3
            </TabPane>
        </Tabs></div>
    );
}

export default CaseForm;
