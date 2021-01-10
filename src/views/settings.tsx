import { notification } from 'antd'
import React, { Component } from 'react'
import SettingsForm, { SettingsFormData } from '../components/settings/SettingsForm'
import { isValidEndpoint } from '../helpers/apolloClient'
import BaseLayout from '../layouts/BaseLayout'

interface Props {

}
interface State {

}

export default class SettingsView extends Component<Props, State> {
    state = {}

    private onFinish = async (data: SettingsFormData) => {
        const isEndpointValid = await isValidEndpoint(data.endpoint);
        if (isEndpointValid) {
            localStorage.setItem("endpoint", data.endpoint);
            window.location.reload();
        } else {
            notification.error({
                message: "Endpoint is invalid"
            });
        }
    }

    private getInitialValues = (): SettingsFormData => {
        return {
            endpoint: localStorage.getItem("endpoint") || ""
        }
    }

    render() {
        return (
            <BaseLayout>
                <SettingsForm
                    initialValues={this.getInitialValues()}
                    layout="vertical"
                    onFinish={this.onFinish} />
            </BaseLayout>
        )
    }
}
