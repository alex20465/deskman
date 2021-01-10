import { Button } from 'antd';
import React, { Component } from 'react'
import { compose } from 'recompose';

import { withMoveDown, withMoveUp, MoveUpProps, MoveDownProps } from "../../models";

interface OuterProps {

}
interface State {

}

type Props = OuterProps & MoveUpProps<{}, "moveUp"> & MoveDownProps<{}, "moveDown">;

class Control extends Component<Props, State> {
    state = {}

    render() {

        const { moveDown, moveUp } = this.props;

        return (
            <React.Fragment>
                <Button onClick={() => moveUp()}>Up</Button>
                <Button onClick={() => moveDown()}>Down</Button>
            </React.Fragment>
        )
    }
}

export default compose<Props, OuterProps>(
    withMoveUp({ name: "moveUp" }),
    withMoveDown({ name: "moveDown" }),
)(Control);