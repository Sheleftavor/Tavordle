import React from "react";
import "../css/Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faChartColumn, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {
    return (
        <div className="Container">Tavordle
            <FontAwesomeIcon icon={faGear} className="gear" onClick={props.openModal} />
            <FontAwesomeIcon icon={faChartColumn} className="stats" />
            <FontAwesomeIcon icon={faCircleInfo} className="info" />
        </div>
    )
}

export default Header