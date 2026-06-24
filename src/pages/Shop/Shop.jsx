import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import ChoiceChip from '../../components/ChoiceChip/ChoiceChip.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import { fetchProducts } from '../../api/products.js'
import { CATEGORIES } from '../../data/categories.js'
import './Shop.css'

function Shop() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || ''
  const sale = params.get('sale') === '1'
  const q = params.get('q') || ''

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [all, setAll] = useState([])
  const [status, setStatus] = useState('loading')
  const [query, setQuery] = useState(q)

  useEffect(() => {
    let active = true
    fetchProducts()
      .then((data) => active && (setAll(data), setStatus('ready')))
      .catch((err) => {
        console.error(err)
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

  // Keep the search box in sync when the URL query changes (e.g. via nav).
  useEffect(() => setQuery(q), [q])

  const filtered = useMemo(() => {
    let list = all
    if (category) list = list.filter((p) => p.category === category)
    if (sale) list = list.filter((p) => p.original)
    if (q) {
      const t = q.trim().toLowerCase()
      list = list.filter((p) =>
        `${p.name} ${p.brand || ''} ${p.caption || ''}`.toLowerCase().includes(t)
      )
    }
    return list
  }, [all, category, sale, q])

  function updateParams(mutate) {
    const next = new URLSearchParams(params)
    mutate(next)
    setParams(next)
  }

  function handleSearch(e) {
    e.preventDefault()
    updateParams((n) => {
      const v = query.trim()
      if (v) n.set('q', v)
      else n.delete('q')
    })
  }

  function selectCategory(value) {
    updateParams((n) => {
      n.delete('sale')
      if (value) n.set('category', value)
      else n.delete('category')
    })
  }

  const title = sale ? 'סייל' : category || (q ? `חיפוש: ${q}` : 'כל הפריטים')

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="shop">
        <header className="shop__head">
          <h1 className="shop__title">{title}</h1>
          <p className="shop__count">
            {status === 'ready' ? `${filtered.length} פריטים` : ''}
          </p>
        </header>

        <form className="shop__search" onSubmit={handleSearch} role="search">
          <Icon name="search" size="md" className="shop__search-icon" />
          <input
            className="shop__search-input"
            type="search"
            placeholder="חיפוש פריט, מותג…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="חיפוש"
          />
        </form>

        <div className="shop__filters hide-scrollbar">
          <ChoiceChip selected={!category && !sale} onClick={() => selectCategory('')}>
            הכל
          </ChoiceChip>
          {CATEGORIES.map((c) => (
            <ChoiceChip key={c} selected={category === c} onClick={() => selectCategory(c)}>
              {c}
            </ChoiceChip>
          ))}
        </div>

        {status === 'loading' && <StateMessage>טוען פריטים…</StateMessage>}
        {status === 'error' && (
          <StateMessage variant="error">שגיאה בטעינת הפריטים.</StateMessage>
        )}
        {status === 'ready' && filtered.length === 0 && (
          <StateMessage>לא נמצאו פריטים שתואמים את הסינון.</StateMessage>
        )}
        {status === 'ready' && filtered.length > 0 && (
          <div className="shop__grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} showFavorite />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  )
}

export default Shop
