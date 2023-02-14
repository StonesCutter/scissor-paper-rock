import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

function Button(props) {

    function callback(e, param) {
        props.callBackButton(e, param);
    }

    return (
        <div
            className={ props.styleCss }
            onClick={ callback }
        >
            { props.label }
        </div>
    );
}

Button.defaultProps = {
    styleCss: "default-btn",
    label: "label",
    callBackButton: ""
}

Button.propTypes = {
    styleCss: PropTypes.string,
    label: PropTypes.string
}

export default Button;


