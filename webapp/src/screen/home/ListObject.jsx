import React from 'react';
import Icon from '@material-ui/core/Icon';

class ListObject extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { nearbyFoodPlace } = this.props;
        return (
            <div className="estabContainer">
                <h3 className="estabName">{nearbyFoodPlace.name}</h3>
                <p className="estabRating">{nearbyFoodPlace.rating.toFixed(2)} <Icon style={{ fontSize: 14, color: 'orange' }}>star</Icon></p>

            </div>
        );
    }
}

export default ListObject;