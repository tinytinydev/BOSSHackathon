import React from 'react';

/* This is High order component */
/* Its only job is to load the image from external url */
/* Once loaded, it will pass the source to the children prop enclosed within it */
class AsyncExternalImageHOC extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            source: null
        }
    }

    componentDidMount() {
        this._isMounted = true;
        if(this.props.image) {
            this.loadImgThumbnail(this.props.image);
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.image && prevProps.image === undefined || this.props.image !== prevProps.image) {
            this.loadImgThumbnail(this.props.image);
        }
    }

    componentWillUnmount() {
        this.setState({
            source: null
        });
        this._isMounted = false;
    }

    render() {
        return this.state.source ? this.props.children(this.state.source) : this.props.children(this.props.placeholder);
    }

    loadImgThumbnail(imageURL) {
        let image = new Image();
        image.onload = () => {
            if(this._isMounted) {
                this.setState({
                    source: image.src,
                })
            }
        };
        image.src = imageURL
    }
}

export default AsyncExternalImageHOC;