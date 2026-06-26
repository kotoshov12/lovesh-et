import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import {
  fetchConversation,
  fetchMessages,
  sendMessage,
  subscribeToMessages,
  markConversationRead,
} from '../../api/messages.js'
import { fetchConversationPurchase, respondPurchase } from '../../api/purchases.js'
import { createNotification } from '../../api/notifications.js'
import './Conversation.css'

function Conversation() {
  const { id } = useParams()
  const { user } = useAuth()
  const [conversation, setConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('loading')
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [purchase, setPurchase] = useState(null)
  const [responding, setResponding] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    let active = true
    Promise.all([fetchConversation(id), fetchMessages(id), fetchConversationPurchase(id)])
      .then(([conv, msgs, req]) => {
        if (!active) return
        setConversation(conv)
        setMessages(msgs)
        setPurchase(req)
        setStatus('ready')
        markConversationRead(id)
      })
      .catch((err) => {
        console.error(err)
        if (active) setStatus('error')
      })

    const unsubscribe = subscribeToMessages(id, (msg) => {
      setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]))
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [id])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function respondToPurchase(newStatus) {
    if (!purchase) return
    setResponding(true)
    try {
      await respondPurchase(purchase.id, newStatus)
      const payLabel = purchase.payment_method === 'bit' ? 'תשלום ב-Bit' : 'מפגש לאיסוף'
      const body =
        newStatus === 'approved'
          ? `אישרתי את הרכישה של "${purchase.product_name}" ✅ בוא/י נתאם ${payLabel}.`
          : `דחיתי את בקשת הרכישה של "${purchase.product_name}".`
      const msg = await sendMessage({ conversationId: id, body })
      setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]))
      await createNotification({
        userId: purchase.buyer_id,
        type: 'purchase',
        body:
          newStatus === 'approved'
            ? `הרכישה של "${purchase.product_name}" אושרה! 🎉`
            : `בקשת הרכישה של "${purchase.product_name}" נדחתה.`,
        link: `/messages/${id}`,
      })
      setPurchase({ ...purchase, status: newStatus })
    } catch (err) {
      console.error(err)
    } finally {
      setResponding(false)
    }
  }

  async function handleSend(e) {
    e.preventDefault()
    const body = draft.trim()
    if (!body) return
    setSending(true)
    try {
      const msg = await sendMessage({ conversationId: id, body })
      setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]))
      setDraft('')
    } catch (err) {
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="page">
      <Header />

      <main className="conv">
        <div className="conv__bar">
          <Link to="/messages" className="conv__back" aria-label="חזרה">
            <Icon name="arrow_forward" size="md" />
          </Link>
          <Link
            to={conversation?.otherId ? `/user/${conversation.otherId}` : '#'}
            className="conv__who"
          >
            <span className="conv__avatar">
              {conversation?.other?.avatar_url ? (
                <img src={conversation.other.avatar_url} alt="" />
              ) : (
                <Icon name="account_circle" size="lg" />
              )}
            </span>
            <span className="conv__who-text">
              <span className="conv__name">{conversation?.other?.full_name || 'משתמש'}</span>
              {conversation?.product && (
                <span className="conv__sub">על: {conversation.product.name}</span>
              )}
            </span>
          </Link>
          {conversation?.product && (
            <Link to={`/product/${conversation.product.id}`} className="conv__product">
              <img src={conversation.product.image} alt="" />
            </Link>
          )}
        </div>

        {purchase && (
          <div className={`conv__purchase conv__purchase--${purchase.status}`}>
            <div className="conv__purchase-info">
              <Icon name="shopping_bag" size="sm" />
              <span>
                בקשת רכישה: <strong>{purchase.product_name}</strong> · ₪{purchase.amount} ·{' '}
                {purchase.payment_method === 'bit' ? 'Bit' : 'תשלום במקום'}
              </span>
            </div>

            {purchase.status === 'pending' &&
              (conversation?.seller_id === user?.id ? (
                <div className="conv__purchase-actions">
                  <button
                    type="button"
                    className="conv__purchase-btn conv__purchase-btn--ok"
                    disabled={responding}
                    onClick={() => respondToPurchase('approved')}
                  >
                    אישור
                  </button>
                  <button
                    type="button"
                    className="conv__purchase-btn conv__purchase-btn--no"
                    disabled={responding}
                    onClick={() => respondToPurchase('declined')}
                  >
                    דחייה
                  </button>
                </div>
              ) : (
                <span className="conv__purchase-status">ממתין לאישור המוכר/ת…</span>
              ))}

            {purchase.status === 'approved' && (
              <span className="conv__purchase-status conv__purchase-status--ok">אושר ✅</span>
            )}
            {purchase.status === 'declined' && (
              <span className="conv__purchase-status conv__purchase-status--no">נדחה</span>
            )}
          </div>
        )}

        <div className="conv__thread">
          {status === 'loading' && <StateMessage>טוען שיחה…</StateMessage>}
          {status === 'error' && (
            <StateMessage variant="error">
              שגיאה בטעינת השיחה. ודא/י שהרצת את מיגרציית ההודעות.
            </StateMessage>
          )}
          {status === 'ready' && messages.length === 0 && (
            <StateMessage>אין עדיין הודעות — תכתב/י הודעה ראשונה.</StateMessage>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`conv__bubble ${m.sender_id === user?.id ? 'is-mine' : 'is-theirs'}`}
            >
              {m.body}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form className="conv__compose" onSubmit={handleSend}>
          <input
            className="conv__input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="תכתב/י הודעה…"
            aria-label="הודעה"
          />
          <button type="submit" className="conv__send" disabled={sending} aria-label="שליחה">
            <Icon name="send" size="md" />
          </button>
        </form>
      </main>
    </div>
  )
}

export default Conversation
