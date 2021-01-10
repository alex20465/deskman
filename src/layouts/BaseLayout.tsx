import React, { Component } from 'react'
import { Layout, Menu, PageHeader } from 'antd';
import { compose } from "recompose";
import { SettingOutlined, HomeOutlined } from "@ant-design/icons";

import "./base-layout.css";
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { PageHeaderProps } from 'antd/lib/page-header';

const { Content, Sider } = Layout;

interface OuterProps {
    loading?: boolean
    header?: PageHeaderProps
}
interface State {
}

type Props = OuterProps & RouteComponentProps;

class BaseLayout extends Component<Props, State> {
    state: State = {
    }


    private isConfigured = () => {
        return !!localStorage.getItem("endpoint");
    }

    render() {

        const { header } = this.props;

        return (
            <Layout className="base-layout">
                <Sider collapsed={true}>
                    <Menu theme="dark" selectedKeys={[this.props.location.pathname]}>
                        <Menu.Item key="/" title="Home" disabled={!this.isConfigured()}>
                            <Link to="/">
                                <HomeOutlined />
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/settings" title="Settings">
                            <Link to="/settings">
                                <SettingOutlined />
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <PageHeader {...header} />
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}


export default compose<Props, OuterProps>(
    withRouter
)(BaseLayout);