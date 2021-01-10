import React, { Component } from 'react'
import {
    Route,
    withRouter,
    RouteComponentProps
} from "react-router-dom";
import HomeView from './views/home';
import SettingsView from './views/settings';
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache, } from "@apollo/client";
import { compose } from 'recompose';
import { createClient } from './helpers/apolloClient';
interface OuterProps {

}

interface State {
    client: ApolloClient<any> | null
    endpoint: string
}

type Props = OuterProps & RouteComponentProps;


class Router extends Component<Props, State> {
    state = {
        client: null,
        endpoint: ""
    } as State;

    componentDidMount = async () => {
        const endpoint = localStorage.getItem("endpoint");

        if (endpoint) {
            this.setState({
                endpoint,
                client: await createClient(endpoint)
            });
        } else {
            this.props.history.push("/settings");
        }
    }

    render() {
        const { client, endpoint } = this.state;

        let session;

        if (endpoint && client)
            session = (
                <ApolloProvider client={client}>
                    <Route path="/" exact component={HomeView} />
                </ApolloProvider>
            );

        return (
            <React.Fragment>
                {session}
                <Route path="/settings" exact component={SettingsView} />
            </React.Fragment>
        )
    }
}


export default compose<Props, OuterProps>(
    withRouter
)(Router);