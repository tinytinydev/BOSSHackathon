import React from 'react';
import Container from "@material-ui/core/Container";
import ListObject from "./ListObject";

class ListView extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        if(!this.props.nearbyFoodPlaces) {
            return <React.Fragment/>
        } else {
            return (
                <React.Fragment>
                    <Container className="listContainer">
                        {
                            this.props.nearbyFoodPlaces.map(nearbyFoodPlace => <ListObject nearbyFoodPlace={nearbyFoodPlace}/>)
                        }
                    </Container>
                </React.Fragment>
            )
        }
    }

}

export default ListView;