import axios from 'axios';
import * as API from '../constants/APIUtil';

export async function getNearbyFood(lat, lng) {
    const endpoint = "locations" + "/" + "getnearbyfood" + "/" + "latlong" + "/" + lat + "," + lng;
    return await axios.get(endpoint, {
        baseURL: API.APIHOST,
        headers: {'Content-Type': 'application/json'},
    })
}

export async function getNearbyFoodBySearch(query, lat, lng) {
    const endpoint = "locations" + "/" + "nearbycusine" + "/" + "cusine" + "/" + query + "/" + "latlong" + "/" + lat + "," + lng;
    return await axios.get(endpoint, {
        baseURL: API.APIHOST,
        headers: {'Content-Type': 'application/json'},
    })
}