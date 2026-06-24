import './Checkbox.css'

function Checkbox({ label, id, checked, onChange, className = '' }) {
  return (
    <div className={`checkbox ${className}`}>
      <input id={id} type="checkbox" className="checkbox__input" checked={checked} onChange={onChange} />
      <label className="checkbox__label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
