import FormField from '../FormField/FormField.jsx'
import './Textarea.css'

function Textarea({ label, id, placeholder, rows = 4, ...rest }) {
  return (
    <FormField label={label} htmlFor={id}>
      <textarea id={id} className="textarea" placeholder={placeholder} rows={rows} {...rest} />
    </FormField>
  )
}

export default Textarea
