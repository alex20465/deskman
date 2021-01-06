import React, { Component } from 'react'
import { Layout, Menu, Button, Typography } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

interface Props {

}
interface State {

}

export default class BaseLayout extends Component<Props, State> {
    state: State = {

    }

    render() {
        return (
            <Layout className="base-layout">
                <Layout className="site-layout">
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
