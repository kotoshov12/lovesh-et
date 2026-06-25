import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../Icon/Icon.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { isFollowing, followSeller, unfollowSeller, countFollowers } from '../../api/follows.js'
import './FollowButton.css'

/** Follow / unfollow a seller, with a live follower count. */
function FollowButton({ sellerId }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [following, setFollowing] = useState(false)
  const [count, setCount] = useState(0)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let active = true
    countFollowers(sellerId).then((c) => active && setCount(c))
    if (user) isFollowing(sellerId).then((f) => active && setFollowing(f))
    return () => {
      active = false
    }
  }, [sellerId, user?.id])

  async function toggle() {
    if (!user) {
      navigate('/login')
      return
    }
    setBusy(true)
    try {
      if (following) {
        await unfollowSeller(sellerId)
        setFollowing(false)
        setCount((c) => Math.max(0, c - 1))
      } else {
        await followSeller(sellerId)
        setFollowing(true)
        setCount((c) => c + 1)
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
