import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, BankOutlined, HomeOutlined, CodepenOutlined, ApartmentOutlined } from '@ant-design/icons';
import { Link, } from "react-router-dom";
const { Sider } = Layout;

const AppSlider = () => {


    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <div className="logo">
                Tractian
            </div>
            <Menu theme="dark" mode="vertical" >

                <Menu.Item key="/" icon={<HomeOutlined />}>
                    <Link to="/">
                        Home
                    </Link>
                </Menu.Item>

                <Menu.Item key="/ativos" icon={<CodepenOutlined />}>
                    <Link to="/ativos">Ativos</Link>
                </Menu.Item>


                <Menu.Item key="/unidades" icon={<ApartmentOutlined />}>
                    <Link to="/unidades">Unidades</Link>
                </Menu.Item>
 
                <Menu.Item key="/users" icon={<UserOutlined />}>
                    <Link to="/usuarios">Usuários</Link>
                </Menu.Item>

                <Menu.Item key="/empresas" icon={<BankOutlined />}>
                    <Link to="/empresas">Empresas</Link>
                </Menu.Item>
            </Menu>
        </Sider>)
}

export default AppSlider