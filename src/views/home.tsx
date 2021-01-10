import React, { Component } from 'react'
import BaseLayout from '../layouts/BaseLayout'
import { compose } from "recompose";
import { GetDefaultDeskProps, withGetDefaultDesk } from '../models';
import Details from '../components/desk/Details';
import Control from '../components/desk/Control';
interface OuterProps {

}
interface State {

}

type Props = OuterProps & GetDefaultDeskProps;

class HomeView extends Component<Props, State> {
    state = {}

    render() {

        const { data: { loading, desk } } = this.props;

        return (
            <BaseLayout header={{
                title: desk?.name,
                subTitle: desk?.profile,
            }} >
                <Details />
                <Control />
            </BaseLayout>
        )
    }
}

export default compose<Props, OuterProps>(
    withGetDefaultDesk()
)(HomeView);
