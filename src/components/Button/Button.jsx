import Icon from '../Icon/Icon.jsx'
import './Button.css'

/**
 * @param {'primary'|'outline'|'text'} variant
 * @param {string} [icon] - optional Material Symbol name rendered after the label
 */
function Button({
  children,
  variant = 'primary',
  icon,
  type = 'button',
  fullWidth = false,
  onClick,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn--${variant} ${fullWidth ? 'btn--full' : ''} ${className}`}
    >
      <span>{children}</span>
      {icon && <Icon name={icon} size="sm" />}
    </button>
  )
}

export default Button
