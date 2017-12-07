import * as React from 'react'
import { Menu, Icon } from 'antd';
import AccountsUIWrapper from './AccountsUIWrapper.js';

export default class Nav extends React.Component {
    render() {
        return (
            <Menu
                selectedKeys={["home"]}
                mode="horizontal"
            >
                <Menu.Item key="home">
                    <a href="#"><Icon type="home" />Accueil</a>
                </Menu.Item>
                <Menu.Item key="profil" className="profil">
                    <Icon type="user"/><AccountsUIWrapper />
                </Menu.Item>
            </Menu>
        );
    }
}
