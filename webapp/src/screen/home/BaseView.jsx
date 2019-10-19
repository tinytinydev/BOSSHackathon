import React from 'react';
import MapView from "./MapView";
import TemporaryDrawer from './TemporaryDrawer';



class BaseView extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>


                <TemporaryDrawer></TemporaryDrawer>
                <h1>Hi</h1>
                <MapView/>
            </div>

        );
    }

}

export default BaseView;