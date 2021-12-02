import React, { useState, useImperativeHandle } from 'react'

const Toggable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideDisplay = { display: visible ? 'none' : ''}
    const showDisplay = { display: visible ? '' : 'none'}
    
    const toggleVisibility = () => {
        setVisible(!visible)
    }
    
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    
    return (
        <div>
            <div style={hideDisplay}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showDisplay}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

export default Toggable