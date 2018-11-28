import React, { Component } from 'react';

 import './Button.css';

export default class Button extends Component {
  render() {

    const { text, type="submit" } = this.props

    return (
        <div className="button_container">
            <button type={type} className="button">{text}</button>
        </div>
    );
  }
}
