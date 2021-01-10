import { Descriptions } from 'antd'
import React, { Component } from 'react'
import { compose } from 'recompose';
import { GetDefaultDeskProps, withGetDefaultDesk, withState, StateProps } from '../../models';

interface OuterProps {

}
interface State {

}

type Props = OuterProps & GetDefaultDeskProps & StateProps<{}, "stateChange">;

class Details extends Component<Props, State> {
    state = {}

    render() {
        const { data: { desk }, stateChange: {stateChange} } = this.props;
        
        return (
            <Descriptions>
                <Descriptions.Item label="Name">
                    {desk?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Profile">
                    {desk?.profile}
                </Descriptions.Item>
                <Descriptions.Item label="Speed">
                    {stateChange?.speed || desk?.state.speed}
                </Descriptions.Item>
                <Descriptions.Item label="CM">
                    {(stateChange?.cm || desk?.state.cm || 0).toFixed(2)}
                </Descriptions.Item>
                <Descriptions.Item label="INCHES">
                    {(stateChange?.inch || desk?.state.inch || 0).toFixed(2)}
                </Descriptions.Item>
            </Descriptions>
        );
    }
}

export default compose<Props, OuterProps>(
    withGetDefaultDesk(),
    withState({
        name: "stateChange",
    })
)(Details);