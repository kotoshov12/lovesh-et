import FormField from '../FormField/FormField.jsx'
import './Input.css'

/**
 * Labeled text/number input. Pass `prefix` for a leading symbol (e.g. ₪).
 */
function Input({ label, id, prefix, type = 'text', placeholder, ...rest }) {
  return (
    <FormField label={label} htmlFor={id}>
      {prefix ? (
        <div className="input-group">
          <span className="input-group__prefix">{prefix}</span>
          <input id={id} type={type} placeholder={placeholder} className="input input--bare" {...rest} />
        </div>
      ) : (
        <input id={id} type={type} placeholder={placeholder} className="input" {...rest} />
      )}
    </FormField>
  )
}

export default Input
