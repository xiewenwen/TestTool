import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import React, {useState} from 'react';
import './main.less';
import CaseForm from "./case/CaseForm";
import CaseList from "./case/CaseList";
import DelForm from "./case/delForm";
import SearchForm from "./case/searchForm";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function SiderDemo(){
    const [collapsed,setCollapsed]=useState(false);
    const [state, setState] = useState(false);
    const [menu,setMenu]=useState("1");
    const onCollapse = collapsed => {
        console.log(collapsed);
        setState(collapsed);
    };
    const handleClick = e => {
        console.log('click ', e);
        setMenu(e.key)
        console.log('menu is====',menu)
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={state} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" onClick={handleClick} defaultSelectedKeys={['2']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        用例生成
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        用例列表
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="用例生成">
                        <Menu.Item key="3">新增/编辑</Menu.Item>
                        <Menu.Item key="4">删除</Menu.Item>
                        <Menu.Item key="5">查询</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        Files
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {menu==="1"?<CaseForm></CaseForm>:null}
                        {menu==="2"?<CaseList></CaseList>:null}
                        {menu==="3"?<CaseForm></CaseForm>:null}
                        {menu==="4"?<DelForm></DelForm>:null}
                        {menu==='5'?<SearchForm></SearchForm>:null}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>everyday is mayday</Footer>
            </Layout>
        </Layout>
    );
}

export default SiderDemo;