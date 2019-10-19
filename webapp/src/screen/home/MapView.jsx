import React from 'react';
import * as API from "../../constants/APIUtil";
import {getNearbyFood} from "../../service/Maps";



class MapView extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            lat: 1.352,
            lng: 103.82,
            map: undefined,
            markers: [],
            geocoder: undefined,

            proximityRange: this.props.proximityRange || 50
        });

        this.locationInput = React.createRef();
        this.mapView = React.createRef();

        this.changeProximity = this.changeProximity.bind(this);
        this.onGeocodeSuccess = this.onGeocodeSuccess.bind(this);
    }

    componentDidMount() {
        // Setting up the callback
        window.initMap = () => {this.onGMapsReady()};

        // Check if GMaps script is already loaded
        if(window.google === undefined || window.google.maps === undefined) {
            // Adding GMaps API's script to body
            // Asynchronously load script
            const URL = `${API.GOOGLEMAPS_BASE}?key=${API.GOOGLEMAPS_KEY}&libraries=places&region=SG&callback=initMap`;
            let script = document.createElement('script');
            script.src = URL;
            script.async = true;
            document.body.appendChild(script);
        } else {
            this.onGMapsReady();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.userSearchQuery != this.props.userSearchQuery) {
            console.log("change");
        }
    }

    render() {
        return (
            <div className="mapContainer">
                <div ref={this.mapView} className="map"/>
            </div>
        )
    }



    onGMapsReady() {
        // The javascript object (google.maps) lives in the window object!
        const latLng = new window.google.maps.LatLng(this.state.lat, this.state.lng);

        let map = new window.google.maps.Map(this.mapView.current, {
            center: latLng,
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        });

        let geocoder = new window.google.maps.Geocoder();


        // Address Autocomplete Fields
        let autoComplete = new window.google.maps.places.Autocomplete(this.locationInput.current, {
            //Restricted to Singapore address only!
            componentRestrictions: {country: 'sg'}
        });
        autoComplete.setFields(['address_components', 'geometry', 'types']);
        autoComplete.bindTo('bounds', map);

        /*autoComplete.addListener('place_changed', () => {
            this.changeLocation(autoComplete.getPlace());
        });*/

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position => this.onGeocodeSuccess(position)));
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

        this.setState({
            map: map,
            geocoder: geocoder,
        });
    }

    changeLocation(newPlace) {
        // Check for invalid places!
        // Will return a place object with just a name field if invalid
        if(newPlace.geometry) {
            // Zoom in & Enhance map
            if (newPlace.geometry.viewport) {
                this.state.map.fitBounds(newPlace.geometry.viewport);
            } else {
                this.state.map.setCenter(newPlace.geometry.location);
                this.state.map.setZoom(17);
            }

            // Set marker and radius to position
            this.state.marker.setPosition(newPlace.geometry.location);
            this.state.markerRadius.setCenter(newPlace.geometry.location);

            this.geocode(newPlace);
        }
    }

    geocode(place) {
        //Try Singapore 123311 and be amazed
        if(place.types[0] === 'postal_code') {
            this.reverseGeocode(place.geometry.location);
        } else {
            let addrComponentMap = new Map();
            addrComponentMap.set("street_number", '');
            addrComponentMap.set("route", '');
            addrComponentMap.set("postal_code", '');
            // These are the possible ways Google will return landmark name
            addrComponentMap.set("premise", '');
            addrComponentMap.set("establishment", '');
            addrComponentMap.set("point_of_interest", '');
            let addressComponents = place.address_components;

            for(let i = 0; i < addressComponents.length; i++) {
                let addressComponentTypes = addressComponents[i].types;

                if(addrComponentMap.has(addressComponentTypes[0])) {
                    addrComponentMap.set(addressComponentTypes[0], addressComponents[i].long_name);
                }
            }

            if(addrComponentMap.get("route") === '') {
                this.reverseGeocode(place.geometry.location);
            } else {
                this.onLocationChange(addrComponentMap, place.geometry.location);
            }
        }
    }

    reverseGeocode(location) {
        this.state.geocoder.geocode({
            'location': location
        }, (results, status) => {
            if(status === 'OK') {
                let addrComponentMap = new Map();
                addrComponentMap.set("street_number", '');
                addrComponentMap.set("route", '');
                addrComponentMap.set("postal_code", '');
                // These are the possible ways Google will return landmark name
                addrComponentMap.set("premise", '');
                addrComponentMap.set("establishment", '');
                addrComponentMap.set("point_of_interest", '');

                for(let i = 0; i < results.length; i++) {
                    let resultAddrComponents = results[i].address_components;

                    for(let j = 0; j < resultAddrComponents.length; j++) {
                        let components = resultAddrComponents[j];
                        let type = components.types[0];

                        if(addrComponentMap.has(type) && addrComponentMap.get(type) === '') {
                            addrComponentMap.set(type, components.long_name);
                        }
                    }
                }

                this.onLocationChange(addrComponentMap, location);
            }
        })
    }

    changeProximity(event) {
        this.setState({
            proximityRange: event.target.value
        });
        this.state.markerRadius.setRadius(parseInt(event.target.value));
        this.onProximityChange(parseInt(event.target.value));
    }



    /* Parent Listeners */
    onLocationChange(addressComponents, location) {
        if(this.props.onLocationChange) {
            this.props.onLocationChange(addressComponents, location);
        }
    }

    onProximityChange(proximityValue) {
        if(this.props.onProximityChange) {
            this.props.onProximityChange(proximityValue);
        }
    }

    onGeocodeSuccess(position) {
        console.log(position);
        const latLng = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.retrieveNearbyFoodPlaces(position.coords.latitude, position.coords.longitude);


        /*this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        });*/
    }

    async retrieveNearbyFoodPlaces(latitude, longitude) {
        const nearbyFoodPlaces = await getNearbyFood(latitude, longitude);
        const markers = this.state.markers;
        markers.forEach((marker) => {
            marker.setMap(null);
        });

        nearbyFoodPlaces.data.results.forEach(result => {
            let infoWindow = new window.google.maps.InfoWindow({
                content: result.name
            });
            let marker = new window.google.maps.Marker({
                map: this.state.map,
                animation: window.google.maps.Animation.DROP,
                position: result.geometry.location,
                title: result.name,
            });
            marker.addListener('click', function() {
                infoWindow.open(marker.getMap(), marker);
            });
            markers.push(marker);
        });

        this.setState({
            markers: markers,
            nearbyFoodPlaces: nearbyFoodPlaces.data.results
        }, () => {
            this.props.onNearbyFoodPlacesChangeListener(nearbyFoodPlaces.data.results);
        })
    }
}

export default MapView;
