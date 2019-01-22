import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps';
import {POS_KEY} from "../constants"
import {AroundMarker} from "./AroundMarker"

class AroundMap extends React.Component {
    reloadMarkers = () => {
        console.log('reloadMarkers');
        const center = this.map.getCenter();
        const range = this.getRange();
        console.log(range);
        const location = {
          latitude: center.lat(),
          longitude: center.lng()
        };
        this.props.loadNearbyPosts(location, range);
    }

    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new google.maps.LatLng(center.lat(), ne.lng());
            return 0.001 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }

    getMapRef = (map) => {
        this.map = map;
        window.map = map;
        //window.map.getCenter(): get the center of current map
        //window.map.getBound(): get the bound of current map
    }
    render() {
        const { latitude, longitude } = JSON.parse(localStorage.getItem(POS_KEY));
        console.log(this.props.posts);


        return (
            <GoogleMap
                ref={this.getMapRef}
                onDragEnd={this.reloadMarkers}
                onZoomChanged={this.reloadMarkers}
                defaultZoom={11}
                defaultCenter={{ lat: latitude, lng: longitude }}
            >
                {
                    this.props.posts.map(
                        (post) => (<AroundMarker
                            key={post.url}
                            post = {post}
                    />)
                    )
                }
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));