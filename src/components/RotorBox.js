import * as React from "react";
import "./sass/main.scss";


const RotorBox = ({ headline, subtext, text }) => {
    return (
        <div className="rotor-box-container is-10 m-auto">
            <div className="rotor-box column">
                <h2 className="is-size-2 mb-4">{headline}</h2>
                <p className="has-text-weight-bold mb-3">{subtext}</p>
                {<ul className="list">
                    {text.map(item => (
                        <li className="list-item">{item}</li>
                    ))}
                </ul>}
            </div>
        </div>
    );
}
export default RotorBox;