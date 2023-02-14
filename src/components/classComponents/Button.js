import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../ui/button/button.css';

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggle: false
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    callback = (e) => {
        this.props.callBackButton(e);
    }

    handleButton() {
        this.setState({
            isToggle: !this.state.isToggle
        })
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div
                className={ this.props.styleCss }
                onClick={ this.callback }
            >
                { this.props.label }
            </div>
        )
    }
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


