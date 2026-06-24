import FormField from '../FormField/FormField.jsx'
import Icon from '../Icon/Icon.jsx'
import './Select.css'

/**
 * @param {{value:string,label:string}[]|string[]} options
 */
function Select({ label, id, options = [], ...rest }) {
  return (
    <FormField label={label} htmlFor={id}>
      <div className="select">
        <select id={id} className="select__control" {...rest}>
          {options.map((opt) => {
            const value = typeof opt === 'string' ? opt : opt.value
            const text = typeof opt === 'string' ? opt : opt.label
            return (
              <option key={value} value={value}>
                {text}
              </option>
            )
          })}
        </select>
        <Icon name="expand_more" size="md" className="select__chevron" />
      </div>
    </FormField>
  )
}

export default Select
