import { Table, Tag, Space } from 'antd';
import React, {Component, useState} from 'react';
import { Modal, Button } from 'antd';
import DelForm from "./delForm";
import CaseForm from "./CaseForm";

const columns = [
    {
        title: '用例名称',
        dataIndex: 'caseName',
        key: 'caseName',
        render: text => <a>{text}</a>,
    },
    {
        title: '前置步骤',
        dataIndex: 'testBefore',
        key: 'testBefore',
    },
    {
        title: '操作步骤',
        dataIndex: 'testStep',
        key: 'testStep',
    },
    {
        title: '预期结果',
        dataIndex: 'testWish',
        key: 'testWish',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        caseName: '这是用例名称',
        testBefore: '这是前置步骤',
        testStep:'这是测试步骤',
        testWish: '这是预期结果',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        caseName: '这是用例名称',
        testBefore: '这是前置步骤',
        testStep:'这是测试步骤',
        testWish: '这是预期结果',
        tags: ['loser'],
    },
    {
        key: '3',
        caseName: '这是用例名称',
        testBefore: '这是前置步骤',
        testStep:'这是测试步骤',
        testWish: '这是预期结果',
        tags: ['cool', 'teacher'],
    },
];

function CaseList(props){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [type,setType] =useState(1);

    const showModal = () => {
        // console.log('type=====',value)
        // setType(value);
        setIsModalVisible(true);

    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return(
        <div>
            <Button type="primary" onClick={showModal}>
                新增/编辑
            </Button>
            <Button type="primary" onClick={showModal}>
                删除
            </Button>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <DelForm></DelForm>
            </Modal>
            <Table columns={columns} dataSource={data} />
        </div>
    );
}

export default CaseList;