import './ChoiceChip.css'

/**
 * Selectable pill used for category / size / condition pickers.
 */
function ChoiceChip({ children, selected = false, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`chip ${selected ? 'chip--selected' : ''} ${className}`}
    >
      {children}
    </button>
  )
}

export default ChoiceChip
