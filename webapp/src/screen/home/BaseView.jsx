import React from 'react';
import MapView from "./MapView";

class BaseView extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h1>Hi</h1>
                <MapView/>
            </div>

        );
    }

}

export default BaseView;