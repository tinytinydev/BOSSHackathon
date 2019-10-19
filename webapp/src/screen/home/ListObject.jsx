import React from 'react';

class ListObject extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { nearbyFoodPlace } = this.props;
        return (
            <div className="estabContainer">
                <h3 className="estabName">{nearbyFoodPlace.name}</h3>
                <p className="estabRating">{nearbyFoodPlace.rating.toFixed(2)}</p>

            </div>
        );
    }
}

export default ListObject;