import React, { Component } from 'react'
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

interface Props {

}
interface State {

}

export default class Router extends Component<Props, State> {
    state = {}

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={() => (<i>Hello home</i>)} />
                </Switch>
            </BrowserRouter>
        )
    }
}
