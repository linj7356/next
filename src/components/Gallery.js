import React from 'react';
import PropTypes from 'prop-types';
import GridGallery from 'react-grid-gallery';

export class Gallery extends React.Component {
    static propTypes = {
        images: PropTypes.arrayOf(
            PropTypes.shape({
                user: PropTypes.string.isRequired,
                src: PropTypes.string.isRequired,
                thumbnail: PropTypes.string.isRequired,
                caption: PropTypes.string,
                thumbnailWidth: PropTypes.number.isRequired,
                thumbnailHeight: PropTypes.number.isRequired
            })
        ).isRequired
    }

    render() {
        var images =
            this.props.images.map((i) => {

                return {
                    ...i,
                    customOverlay: (
                        <div style={captionStyle}>
                            <div>{`${i.user}: ${i.caption}`}</div>
                        </div>
                    )
                };
                /*i.customOverlay = (
                    <div style={captionStyle}>
                        <div>{`${i.user}: ${i.caption}`}</div>
                    </div>);
                return i;*/
            });
        return (
            <div style={wrapperStyle}>
                <GridGallery
                    images={images}
                    enableImageSelection ={false}
                    backdropClosesModal
                />
            </div>
        )
    }
}

const wrapperStyle = {
    display: "block",
    minHeight: "1px",
    width: "100%",
    border: "1px solid #ddd",
    overflow: "auto"
}

const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};

