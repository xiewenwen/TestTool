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
                <Menu theme="dark" onClick={handleClick} defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        用例生成
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        用例列表
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
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
                    {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                    {/*    <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {menu==="1"?<CaseForm></CaseForm>:<CaseList></CaseList>}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>everyday is mayday</Footer>
            </Layout>
        </Layout>
    );
}

export default SiderDemo;