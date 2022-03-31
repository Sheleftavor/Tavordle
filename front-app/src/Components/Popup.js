import React from "react";
import "../css/Popup.css";

const Popup = (props) => {
    return (
        <div className="popupContainer" id="popup">
            {props.errorMessage}
        </div>
    )
}

export default Popup