import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import './UploadItem.css'

const CATEGORIES = ['שמלות', 'חולצות', 'מכנסיים', 'חצאיות', 'נעליים', 'אקססוריז']
const SIZES = ['בחרי מידה', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
const CONDITIONS = ['חדש עם תווית', 'חדש ללא תווית', 'כמו חדש', 'מצב מעולה', 'משומש במצב טוב']

function UploadItem() {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [category, setCategory] = useState('שמלות')
  const [swap, setSwap] = useState(false)

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="upload">
        <div className="upload__intro">
          <h1 className="upload__title">העלאת פריט חדש</h1>
          <p className="upload__subtitle">שתפי את הסטייל שלך עם הקהילה של LOVEsh\et</p>
        </div>

        <section className="upload__photos">
          <PhotoUploader layout="grid" emptySlots={4} />
          <p className="upload__hint">
            מומלץ להעלות לפחות 3 תמונות מזוויות שונות ובאור יום
          </p>
        </section>

        <form className="upload__form" onSubmit={(e) => { e.preventDefault(); navigate('/') }}>
          <Input label="שם הפריט" id="item-name" placeholder="למשל: שמלת משי בוהו-שיק" />

          <FormField label="קטגוריה">
            <div className="upload__chips">
              {CATEGORIES.map((c) => (
                <ChoiceChip key={c} selected={category === c} onClick={() => setCategory(c)}>
                  {c}
                </ChoiceChip>
              ))}
            </div>
          </FormField>

          <div className="upload__grid-3">
            <Select label="מידה" id="size" options={SIZES} />
            <Select label="מצב הפריט" id="condition" options={CONDITIONS} />
            <Input label="מותג" id="brand" placeholder="למשל: Zara, Vintage" />
          </div>

          <Textarea
            label="תיאור הפריט"
            id="description"
            placeholder="ספרי לנו עוד על הבד, הגזרה וסיבת המכירה..."
            rows={4}
          />

          <div className="upload__grid-2">
            <Input label="מחיר מבוקש" id="price" type="number" prefix="₪" placeholder="0.00" />
            <Input label="מיקום לאיסוף" id="location" placeholder="עיר / שכונה" />
          </div>

          <Checkbox
            id="swap"
            label="פתוחה להצעות החלפה (Swap)"
            checked={swap}
            onChange={(e) => setSwap(e.target.checked)}
          />

          <div className="upload__actions">
            <Button type="submit" variant="primary">פרסמי פריט עכשיו</Button>
            <Button type="button" variant="text" onClick={() => navigate('/')}>
              ביטול וחזרה
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}

export default UploadItem
