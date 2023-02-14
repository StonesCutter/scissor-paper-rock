import React from 'react'
import PropTypes from 'prop-types';
import "./newinput.css"

function NewInput(props) {

    function callback(e) {
        props.callbackInput(e)
    }

    return (
        <div
            className={ props.styleNewInput }>
            <label
                className={ props.styleLabel }>
                { props.label }
            </label>
            <input
                type={ props.typeInput }
                name={ props.nameInput }
                value={ props.valueInput }
                id={ props.idInput }
                min={ props.minInput }
                max={ props.maxInput }
                placeholder={ props.placeholderInput }
                onChange={ callback }
            />
        </div>
    )
}

NewInput.defaultProps = {
    styleNewInput: "default-newinput",
    styleLabel: "default-label",
    label: "",
    typeInput: "text",
    id: "id-name",
    min: -100,
    max: 100,
    placeholderInput: "placeholder",
}

NewInput.propTypes = {
    styleNewInput: PropTypes.string,
    styleLabel: PropTypes.string,
    callbackInput: PropTypes.func.isRequired,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
}

export default NewInput