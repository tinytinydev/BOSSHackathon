import React from 'react';
import MapView from "./MapView";
import Fab from '@material-ui/core/Fab';
import ListView from "./ListView";
import TemporaryDrawer from './TemporaryDrawer';
import ListIcon from '@material-ui/icons/List';


class BaseView extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            nearbyFoodPlaces: [],
            userSearch: ""
            showList: false
        });

        this.onNearbyFoodPlacesChange = this.onNearbyFoodPlacesChange.bind(this);
        this.onUserSearch = this.onUserSearch.bind(this);
    }


    showList = () =>{
        console.log("setted")
        this.setState({
            showList: true
        })
    }


    render() {
        /*return (
            <div className="AppContainer">
                <TemporaryDrawer></TemporaryDrawer>

                {
                    this.state.showList ? <ListView nearbyFoodPlaces={this.state.nearbyFoodPlaces}/> : null
                }

                <MapView onNearbyFoodPlacesChangeListener={this.onNearbyFoodPlacesChange}/>
                <div class="bottomRightBtn">
                <Fab onClick={this.showList} style={{margin:5}} color="primary" aria-label="add"><ListIcon /></Fab>
                </div>

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