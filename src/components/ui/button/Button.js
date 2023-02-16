import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './button.css';
import { motion } from "framer-motion"



function Button(props) {
    const [state, setState] = useState({
        rotate: false
    })

    function callback(e, param) {
        props.callBackButton(e, param);
        // setState({ rotate: props.setState })
    }

    return (
        <motion.div animate={ state.rotate ? props.animate : "" }
            initial={ props.initial }
            state={ props.state }
            className={ props.styleCss }
            onClick={ callback }
        >
            { props.label }
        </motion.div>
    );
}

Button.defaultProps = {
    styleCss: "default-btn",
    label: "label",
    callBackButton: "",
}

Button.propTypes = {
    styleCss: PropTypes.string,
    label: PropTypes.string
}

export default Button;


