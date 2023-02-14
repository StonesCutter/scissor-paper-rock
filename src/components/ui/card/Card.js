import React from 'react'
import PropTypes from 'prop-types';

import "./card.css"

function Card(props) {
    return (
        <div className={props.styleCard}>
            <h2 className="name">
                Name:
                <span>
                    {props.wine.name}
                </span>
            </h2>
            <p className='price'>
                Price:
                <span>{props.wine.price}</span>
                $</p>
        </div>
    )
}

Card.defaultProps = {
    styleCard: "default-card",
    wine: "wine-name",
    price: "wine-price"
}

Card.propsTypes = {
    styleCard: PropTypes.string
}

export default Card