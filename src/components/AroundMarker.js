import React from 'react';
import {InfoWindow, Marker} from 'react-google-maps';

export class AroundMarker extends React.Component {
    state = {
        isOpen: false
    }

    onToggleOpen = () => {
        this.setState((prevState)=> ({
           isOpen: !prevState.isOpen
        }));
    }
    render() {
        const {location, user, message, url} = this.props.post;

        return (
            <Marker
                position = {{lat: location.lat, lng: location.lon}}
                onMouseOver={this.onToggleOpen}
                onMouseOut={this.onToggleOpen}

            >
                {
                    this.state.isOpen ? (

                        <InfoWindow onCloseClick={this.onToggleOpen}>
                            <div>
                                <img className="around-marker-image" src={url}/>
                                <p>{`${user}:${message}`}</p>
                            </div>
                        </InfoWindow>
                    ) : null
                }
            </Marker>
        );
    }
}