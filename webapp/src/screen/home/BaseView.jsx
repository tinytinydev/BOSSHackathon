import React from 'react';
import MapView from "./MapView";

import ListView from "./ListView";

import TemporaryDrawer from './TemporaryDrawer';



class BaseView extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            nearbyFoodPlaces: [],
            userSearch: ""
        });

        this.onNearbyFoodPlacesChange = this.onNearbyFoodPlacesChange.bind(this);
        this.onUserSearch = this.onUserSearch.bind(this);
    }

    render() {
        /*return (
            <div className="AppContainer">
                <TemporaryDrawer/>
                <ListView nearbyFoodPlaces={this.state.nearbyFoodPlaces}/>
                <MapView onNearbyFoodPlacesChangeListener={this.onNearbyFoodPlacesChange}/>
            </div>

        );*/
        return (
            <div className="AppContainer">
                <TemporaryDrawer onUserSearchListener={this.onUserSearch}/>
                <MapView onNearbyFoodPlacesChangeListener={this.onNearbyFoodPlacesChange} userSearchQuery={this.state.userSearch}/>
            </div>

        );
    }

    onNearbyFoodPlacesChange(nearbyFoodPlaces) {
        this.setState({
            nearbyFoodPlaces: nearbyFoodPlaces
        })
    }

    onUserSearch(searchString) {
        this.setState({
            userSearch: searchString
        })
    }
}

export default BaseView;