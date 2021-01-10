import { Button, Input } from 'antd';
import Form, { FormProps } from 'antd/lib/form';
import React, { Component } from 'react'
import { compose } from 'recompose'

export interface SettingsFormData {
    endpoint: string
}

interface OuterProps extends FormProps<SettingsFormData> {
    
}
interface State {
    
}


type Props = OuterProps;


class SettingsForm extends Component<Props, State> {
    state = {}

    render() {

        const { ...formProps } = this.props;

        return (
            <Form {...formProps}>
                <Form.Item
                    rules={[
                        {
                            required: true
                        }
                    ]}
                    label="Service Endpoint" name="endpoint">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Save</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default compose<Props, OuterProps>(

)(SettingsForm);