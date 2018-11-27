import React, { Component } from 'react';

import './TextInput.css'

export default class ContentCreator extends Component {

  render() {

    const { onChange, value, multiline, rows, title }  = this.props

    return (
        <div>
            <label htmlFor="inp" className="input-container">

                {multiline && (
                    <textarea
                        className="input" 
                        value={value} 
                        onChange={onChange}
                        type="text" 
                        id="inp" 
                        placeholder="&nbsp;"
                        autoComplete="off"
                        style={{resize: "none"}}
                        rows={rows}
                    />    
                )}
                {!multiline && (
                    <input 
                        className="input" 
                        value={value} 
                        onChange={onChange}
                        type="text" 
                        id="inp" 
                        placeholder="&nbsp;"
                        autoComplete="off"
                    />
                )}

                <span className="input-label">{title}</span>
                <span className="input-border"></span>
            </label>
        </div>
    );
  }
}
