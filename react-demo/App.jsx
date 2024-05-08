import React, { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { ConfigProvider, Layout, Image, Button, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import Menus from "@/components/Menu"
import Breadcrumbs from "@/components/Breadcrumbs"
import Logo from "@/assets/bql.jpg"
import router from "@/config/router"
import locale from 'antd/locale/zh_CN'
import "./App.css";
const { Header, Sider, Content } = Layout;
 
function App(){
    const navigate = useNavigate();
    let location  = useLocation();
    const routes = useRoutes(router)
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        if(location.pathname === '/') {
            navigate(router[0].path)
        }
    })
    return (
        <ConfigProvider
            locale={locale}
            theme={{
                token: {
                    colorPrimary: '#2264FF',
                    borderRadius: 4
                },
            }}>
            <Layout>
                <Sider
                    width={230}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    collapsedWidth={56}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                    }}>
                    <div className="logo-container">
                        {collapsed ? null : <>
                            <Image src={Logo} width={40} height={40} />
                            <div className='logo-title' style={{ marginLeft: 6, whiteSpace: 'nowrap' }}>个人react-demo集合</div>
                        </>}
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined style={{ color: '#fff' }} /> : <MenuFoldOutlined style={{ color: '#fff' }} />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                            fontSize: '14px',
                            width: 54,
                            height: 54,
                            }}
                        />
                    </div>
                    <Menus />
                </Sider>
                <Content
                    style={{
                        margin: 0,
                        padding: 0,
                        height: 'calc(100vh - 55px)'
                    }}>
                    <Breadcrumbs bg={colorBgContainer} />
                    <Content
                        style={{
                            margin: 0,
                            // padding: 16,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            height: 'calc(100% - 39px)',
                        }}>
                        <Suspense fallback={<div style={{ textAlign: 'center', marginTop: 200 }}>loading...</div>}>
                            {routes}
                        </Suspense>
                    </Content>
                </Content>
            </Layout>
        </ConfigProvider>
    )
}
 
export default App