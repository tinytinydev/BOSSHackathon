import React from 'react';
import MapView from "./MapView";
<<<<<<< HEAD
=======
import ListView from "./ListView";
>>>>>>> master
import TemporaryDrawer from './TemporaryDrawer';



class BaseView extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            nearbyFoodPlaces: []
        });

        this.onNearbyFoodPlacesChange = this.onNearbyFoodPlacesChange.bind(this);
    }

    render() {
        return (
            <div>


                <TemporaryDrawer></TemporaryDrawer>
                <h1>Hi</h1>
                <ListView nearbyFoodPlaces={this.state.nearbyFoodPlaces}/>
                <MapView onNearbyFoodPlacesChangeListener={this.onNearbyFoodPlacesChange}/>
            </div>

        );
    }

    onNearbyFoodPlacesChange(nearbyFoodPlaces) {
        this.setState({
            nearbyFoodPlaces: nearbyFoodPlaces
        })
    }
}

export default BaseView;