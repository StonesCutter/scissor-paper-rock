import React from 'react'
import "./input.css"

const Input = (props) => {

    function callBack() {
        props.inputCallback()
    }

    return (
        <div className={`${!!props.styleCss.type && props.styleCss.type} default`}>
            <label>{props.label}</label>
            <input
                type={props.styleCss.type}
                name={props.styleCss.nameInput}
                id={props.styleCss.id}
                required={props.styleCss.required}
                value={props.styleCss.valueInput}
                onChange={callBack}
            />
        </div>
    )
}

export default Input