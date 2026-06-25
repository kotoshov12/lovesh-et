import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../Icon/Icon.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { isFollowing, follow, unfollow, countFollowers } from '../../api/follows.js'
import { createNotification } from '../../api/notifications.js'
import './FollowButton.css'

/**
 * Follow / unfollow a seller or a user, with a live follower count.
 * Pass exactly one of `sellerId` (sellers-table seller) or `userId` (auth user).
 */
function FollowButton({ sellerId, userId }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const target = sellerId ? { sellerId } : { userId }
  const targetKey = sellerId || userId
  const isSelf = userId && user?.id === userId

  const [following, setFollowing] = useState(false)
  const [count, setCount] = useState(0)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!targetKey) return
    let active = true
    countFollowers(target).then((c) => active && setCount(c))
    if (user) isFollowing(target).then((f) => active && setFollowing(f))
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetKey, user?.id])

  if (isSelf) return null

  async function toggle() {
    if (!user) {
      navigate('/login')
      return
    }
    setBusy(true)
    try {
      if (following) {
        await unfollow(target)
        setFollowing(false)
        setCount((c) => Math.max(0, c - 1))
      } else {
        await follow(target)
        setFollowing(true)
        setCount((c) => c + 1)
        // Notify the followed user (only real users have an inbox).
        if (userId) {
          const me = user.user_metadata?.full_name || user.email || 'משתמש/ת'
          createNotification({
            userId,
            type: 'follow',
            body: `${me} התחיל/ה לעקוב אחריך`,
            link: `/user/${user.id}`,
          })
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="follow">
      <button
        type="button"
        className={`follow__btn ${following ? 'is-following' : ''}`}
        onClick={toggle}
        disabled={busy}
      >
        <Icon name={following ? 'check' : 'add'} size="sm" />
        {following ? 'עוקב/ת' : 'עקבו'}
      </button>
      <span className="follow__count">{count} עוקבים</span>
    </div>
  )
}

export default FollowButton
