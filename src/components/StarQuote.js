import * as React from "react";
import "./sass/main.scss";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

const StarQuote = ({ quote, name, image }) => {
    return (
        <div className="starquote mt-3 mx-3 has-text-white" style={{width:'300px'}}>
            
            <div className="has-text-centered">
                <PreviewCompatibleImage 
                    imageInfo={{
                        ...image,
                        imageStyle: { borderRadius: '100%', width: '100px', height: '100px' }
                    }}
                    />
                <div className="starquote-stars my-3">
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                </div>
            </div>

            <div className="is-size-6 is-flex is-justify-content-space-between is-flex-direction-column">
                <p className="mb-4">"{quote}"</p>
                <p className="is-italic has-text-warning">{name}</p>
            </div>
        </div>
    )
};


export default StarQuote;