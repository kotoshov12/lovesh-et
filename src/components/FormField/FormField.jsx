import './FormField.css'

/**
 * Label + control wrapper used by Input, Textarea, Select.
 */
function FormField({ label, htmlFor, children, className = '' }) {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label className="form-field__label" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
    </div>
  )
}

export default FormField
