import Button from '../Button/Button.jsx'
import './ActionBar.css'

/**
 * Detail-page purchase bar. `fixed` pins it to the bottom of the viewport
 * (mobile); otherwise it flows inline (desktop sidebar), stacking vertically.
 */
function ActionBar({
  fixed = false,
  buyText = 'תקנ/י עכשיו',
  messageText = 'תשלח/י הודעה',
  onBuy,
  onMessage,
}) {
  return (
    <div className={`action-bar ${fixed ? 'action-bar--fixed' : 'action-bar--stacked'}`}>
      <Button variant="primary" icon="arrow_back" fullWidth className="action-bar__buy" onClick={onBuy}>
        {buyText}
      </Button>
      <Button
        variant="outline"
        icon="chat_bubble"
        fullWidth
        className="action-bar__message"
        onClick={onMessage}
      >
        {messageText}
      </Button>
    </div>
  )
}

export default ActionBar
