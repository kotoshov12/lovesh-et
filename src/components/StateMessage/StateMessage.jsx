import './StateMessage.css'

/**
 * Centered status message for loading / empty / error states.
 * @param {'info'|'error'} variant
 */
function StateMessage({ children, variant = 'info' }) {
  return <p className={`state-message state-message--${variant}`}>{children}</p>
}

export default StateMessage
