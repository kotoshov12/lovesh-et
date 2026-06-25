import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import PhotoUploader from '../../components/PhotoUploader/PhotoUploader.jsx'
import FormField from '../../components/FormField/FormField.jsx'
import Input from '../../components/Input/Input.jsx'
import Select from '../../components/Select/Select.jsx'
import Textarea from '../../components/Textarea/Textarea.jsx'
import ChoiceChip from '../../components/ChoiceChip/ChoiceChip.jsx'
import Checkbox from '../../components/Checkbox/Checkbox.jsx'
import Button from '../../components/Button/Button.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import {
  createProduct,
  updateProduct,
  fetchProduct,
  uploadProductImage,
} from '../../api/products.js'
import { CATEGORIES } from '../../data/categories.js'
import './UploadItem.css'

const SIZES = ['בחרי מידה', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
const CONDITIONS = ['חדש עם תווית', 'חדש ללא תווית', 'כמו חדש', 'מצב מעולה', 'משומש במצב טוב']

function UploadItem() {
  const navigate = useNavigate()
  const { id } = useParams()
  const editing = Boolean(id)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    category: 'שמלות',
    size: 'בחרי מידה',
    condition: CONDITIONS[0],
    brand: '',
    description: '',
    price: '',
    originalPrice: '',
    location: '',
    swap: false,
  })
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [existingGallery, setExistingGallery] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }))

  // Edit mode: load the existing product into the form.
  useEffect(() => {
    if (!editing) return
    fetchProduct(id)
      .then((p) => {
        if (!p) return
        setForm({
          name: p.name || '',
          category: p.category || 'שמלות',
          size: p.size || 'בחרי מידה',
          condition: p.condition || CONDITIONS[0],
          brand: p.brand || '',
          description: p.description || '',
          price: p.priceValue ?? '',
          originalPrice: p.original ? String(p.original).replace(/[^\d]/g, '') : '',
          location: p.distance || '',
          swap: false,
        })
        setExistingGallery(p.gallery || [])
      })
      .catch((err) => console.error(err))
  }, [id, editing])

  // Previews: chosen files take priority, else existing images (edit).
  useEffect(() => {
    if (files.length === 0) {
      setPreviews(existingGallery)
      return
    }
    const urls = files.map((f) => URL.createObjectURL(f))
    setPreviews(urls)
    return () => urls.forEach((u) => URL.revokeObjectURL(u))
  }, [files, existingGallery])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!form.name.trim()) {
      setError('יש להזין שם פריט.')
      return
    }
    setSubmitting(true)
    try {
      let gallery = existingGallery
      if (files.length > 0) gallery = await Promise.all(files.map((f) => uploadProductImage(f)))

      const payload = {
        name: form.name.trim(),
        category: form.category,
        price: form.price,
        originalPrice: form.originalPrice,
        brand: form.brand,
        size: form.size === 'בחרי מידה' ? null : form.size,
        condition: form.condition,
        description: form.description,
        distance: form.location || null,
        caption: [form.brand, form.size !== 'בחרי מידה' ? form.size : null, form.condition]
          .filter(Boolean)
          .join(' · '),
        eyebrow: form.category,
        image: gallery[0] || null,
        gallery,
      }

      const result = editing ? await updateProduct(id, payload) : await createProduct(payload)
      navigate(`/product/${result.id}`)
    } catch (err) {
      console.error(err)
      setError('שמירת הפריט נכשלה. ודאי שה-bucket לתמונות קיים ונסי שוב.')
      setSubmitting(false)
    }
  }

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="upload">
        <div className="upload__intro">
          <h1 className="upload__title">{editing ? 'עריכת פריט' : 'העלאת פריט חדש'}</h1>
          <p className="upload__subtitle">שתפי את הסטייל שלך עם הקהילה של LOVEsh\et</p>
        </div>

        <section className="upload__photos">
          <PhotoUploader layout="grid" emptySlots={4} previews={previews} onFilesChange={setFiles} />
          <p className="upload__hint">
            אפשר לבחור כמה תמונות יחד · מומלץ לפחות 3 מזוויות שונות ובאור יום
          </p>
        </section>

        <form className="upload__form" onSubmit={handleSubmit}>
          <Input
            label="שם הפריט"
            id="item-name"
            placeholder="למשל: שמלת משי בוהו-שיק"
            value={form.name}
            onChange={(e) => set('name')(e.target.value)}
          />

          <FormField label="קטגוריה">
            <div className="upload__chips">
              {CATEGORIES.map((c) => (
                <ChoiceChip key={c} selected={form.category === c} onClick={() => set('category')(c)}>
                  {c}
                </ChoiceChip>
              ))}
            </div>
          </FormField>

          <div className="upload__grid-3">
            <Select
              label="מידה"
              id="size"
              options={SIZES}
              value={form.size}
              onChange={(e) => set('size')(e.target.value)}
            />
            <Select
              label="מצב הפריט"
              id="condition"
              options={CONDITIONS}
              value={form.condition}
              onChange={(e) => set('condition')(e.target.value)}
            />
            <Input
              label="מותג"
              id="brand"
              placeholder="למשל: Zara, Vintage"
              value={form.brand}
              onChange={(e) => set('brand')(e.target.value)}
            />
          </div>

          <Textarea
            label="תיאור הפריט"
            id="description"
            placeholder="ספרי לנו עוד על הבד, הגזרה וסיבת המכירה..."
            rows={4}
            value={form.description}
            onChange={(e) => set('description')(e.target.value)}
          />

          <div className="upload__grid-2">
            <Input
              label="מחיר מבוקש"
              id="price"
              type="number"
              prefix="₪"
              placeholder="0"
              value={form.price}
              onChange={(e) => set('price')(e.target.value)}
            />
            <Input
              label="מחיר מקורי (לפני הנחה)"
              id="original-price"
              type="number"
              prefix="₪"
              placeholder="אופציונלי"
              value={form.originalPrice}
              onChange={(e) => set('originalPrice')(e.target.value)}
            />
          </div>
          <p className="upload__discount-hint">
            הזיני מחיר מקורי גבוה מהמחיר המבוקש כדי להציג מבצע (המחיר יוצג מחוק והפריט יסומן "מבצע").
          </p>

          <Input
            label="מיקום לאיסוף"
            id="location"
            placeholder="עיר / שכונה"
            value={form.location}
            onChange={(e) => set('location')(e.target.value)}
          />

          <Checkbox
            id="swap"
            label="פתוחה להצעות החלפה (Swap)"
            checked={form.swap}
            onChange={(e) => set('swap')(e.target.checked)}
          />

          {error && <StateMessage variant="error">{error}</StateMessage>}

          <div className="upload__actions">
            <Button type="submit" variant="primary">
              {submitting ? 'שומרת…' : editing ? 'שמירת שינויים' : 'פרסמי פריט עכשיו'}
            </Button>
            <Button type="button" variant="text" onClick={() => navigate(-1)}>
              ביטול
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}

export default UploadItem
