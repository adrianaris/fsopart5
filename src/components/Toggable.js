import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideDisplay = { display: visible ? 'none' : '' }
  const showDisplay = { display: visible ? '' : 'none' }

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
      <div style={showDisplay} className="toggableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggable.displayName = 'Toggable'

export default Toggable