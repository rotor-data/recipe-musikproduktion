import React, { useEffect } from "react";
import { Script } from "gatsby";

const Calendly = ({ url }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div id="schedule_form">
            <div 
                className="calendly-inline-widget"
                data-url={url}
                style={{ minWidth: '320px', height: '880px' }} />
        </div>
    );
};

export default Calendly;
