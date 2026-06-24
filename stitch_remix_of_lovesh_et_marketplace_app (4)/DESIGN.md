---
name: LOVEsh\et — Pomegranate Garden
colors:
  surface: '#fff8f7'
  surface-dim: '#e9d6d5'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0ef'
  surface-container: '#fee9e8'
  surface-container-high: '#f8e4e3'
  surface-container-highest: '#f2dedd'
  on-surface: '#231919'
  on-surface-variant: '#564241'
  inverse-surface: '#392e2d'
  inverse-on-surface: '#ffedec'
  outline: '#897171'
  outline-variant: '#ddc0bf'
  surface-tint: '#a23c40'
  primary: '#5d0612'
  on-primary: '#ffffff'
  primary-container: '#7c1f26'
  on-primary-container: '#ff8d8e'
  inverse-primary: '#ffb3b2'
  secondary: '#73584e'
  on-secondary: '#ffffff'
  secondary-container: '#fcd8ca'
  on-secondary-container: '#785d52'
  tertiary: '#00322f'
  on-tertiary: '#ffffff'
  tertiary-container: '#004a46'
  on-tertiary-container: '#7db9b3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#ffb3b2'
  on-primary-fixed: '#410008'
  on-primary-fixed-variant: '#83242a'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#e2bfb2'
  on-secondary-fixed: '#2a170f'
  on-secondary-fixed-variant: '#5a4137'
  tertiary-fixed: '#b1eee8'
  tertiary-fixed-dim: '#96d2cc'
  on-tertiary-fixed: '#00201e'
  on-tertiary-fixed-variant: '#0a4f4b'
  background: '#fff8f7'
  on-background: '#231919'
  surface-variant: '#f2dedd'
  accent-saffron: '#C8932B'
  complementary-olive: '#5A6328'
  background-cream: '#ECE3D0'
  surface-stone: '#B5B0A6'
  text-muted: '#6B5544'
  error-red: '#C8243C'
typography:
  h1-hero:
    fontFamily: Karantina
    fontSize: 78px
    fontWeight: '700'
    lineHeight: '0.9'
  h2-section:
    fontFamily: Karantina
    fontSize: 42px
    fontWeight: '700'
    lineHeight: '1.0'
  h3-product:
    fontFamily: Karantina
    fontSize: 22px
    fontWeight: '700'
    lineHeight: '1.05'
  body-large:
    fontFamily: Assistant
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.65'
  body-main:
    fontFamily: Assistant
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  caption:
    fontFamily: Assistant
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.6px
  label-eyebrow:
    fontFamily: Assistant
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1.5'
    letterSpacing: 2.5px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  4xl: 64px
  5xl: 96px
---

# LOVEsh\et — Design System

**Pomegranate Garden · Version 1.0**

חנות יד-שנייה אונליין לקהל ישראלי צעיר. אסתטיקה ים-תיכונית-אדיטוריאלית: רימון, זעפרן, זית על קרם חם.

---

## Colors

מערכת בת 9 טוקני צבע. לכל אחד תפקיד אחד ברור.

| Token            | Hex       | שם           | שימוש                                            |
| ---------------- | --------- | ------------ | ------------------------------------------------ |
| Primary          | `#7C1F26` | רימון        | CTA, ניווט, באדג'י SALE, מחירי הנחה              |
| Secondary        | `#2B1810` | עץ כהה       | טקסט גוף, כותרות, footer, בורדרים                |
| Accent           | `#C8932B` | זעפרן        | באדג'י ״חדש״, pre-headlines, hover, נקודת הלוגו  |
| Complementary    | `#5A6328` | זית          | הדגשת מילים בכותרות, success states              |
| Background       | `#ECE3D0` | קרם          | רקע ראשי                                         |
| Surface          | `#B5B0A6` | אבן          | placeholders לתמונות, אזורים נטרליים             |
| Text Secondary   | `#6B5544` | חום עמום     | captions, placeholders, מטא                      |
| Error            | `#C8243C` | אדום שגיאה   | ולידציה, התראות                                  |
| Success          | `#5A6328` | זית          | אישורים (זהה ל-Complementary)                    |

---

## Typography

**Karantina** (Bold 700) — פונט תצוגה צר ודרמטי, לכותרות ולמחירים בלבד.
**Assistant** (Regular 400, Medium 500, SemiBold 600) — פונט גוף נקי, לכל שאר הטקסט.

| סוג                  | פונט      | משקל | גודל | line-height | letter-spacing |
| -------------------- | --------- | ---- | ---- | ----------- | -------------- |
| H1 — Hero            | Karantina | 700  | 78px | 0.9         | —              |
| H2 — Section         | Karantina | 700  | 42px | 1.0         | —              |
| H3 — Product / Price | Karantina | 700  | 22px | 1.05        | —              |
| Body Large           | Assistant | 400  | 16px | 1.65        | —              |
| Body                 | Assistant | 400  | 14px | 1.6         | —              |
| Caption              | Assistant | 500  | 11px | 1.5         | 0.6px          |
| Label / Eyebrow      | Assistant | 600  | 11px | 1.5         | 2.5px          |

מקור הפונטים: [Google Fonts](https://fonts.google.com) / [Fontsource](https://fontsource.org).

---

## Foundations

### יחידת בסיס

**8px** — כל ריווח באתר הוא מכפלה של 8.

סקאלה: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` (px)

### עיגול פינות

**0px** — פינות ישרות בכל מקום: כפתורים, כרטיסים, באדג'ים, קלטים, תמונות. החדות היא חלק מ-DNA המותג.

### עיצוב כללי

- ללא גרדיאנטים
- ללא צללים (drop-shadows)
- ללא glow / blur
- שטוח, נקי, חד

### כיוון

RTL — מימין לשמאל בכל מקום באתר.

---

## Components

### Buttons

**Primary**

| מאפיין     | ערך                                       |
| ---------- | ----------------------------------------- |
| Background | `#7C1F26`                                 |
| Text       | `#ECE3D0`                                 |
| Padding    | `13px 26px`                               |
| Font       | Assistant SemiBold 13px, tracking 1.2px   |
| Radius     | `0`                                       |
| Hover      | `#5C161D`                                 |

```css
.btn-primary {
  background: #7C1F26;
  color: #ECE3D0;
  padding: 13px 26px;
  font: 600 13px/1 'Assistant', sans-serif;
  letter-spacing: 1.2px;
  border: none;
  border-radius: 0;
  cursor: pointer;
}
.btn-primary:hover { background: #5C161D; }
```

**Secondary (outline)**

| מאפיין     | ערך                                       |
| ---------- | ----------------------------------------- |
| Background | שקוף                                      |
| Border     | `1.5px solid #2B1810`                     |
| Text       | `#2B1810`                                 |
| Padding    | `11.5px 26px` (מפצה על הבורדר)            |
| Hover      | ממולא ב-`#2B1810` עם טקסט קרם             |

**Text link**

Assistant SemiBold 11px, tracking 1.8px, צבע `#2B1810`, עם `border-bottom: 1px solid #2B1810`. ללא padding.

---

### Product Cards

מבנה שטוח — ללא בורדר, ללא צל.

**אזור התמונה:**

- `aspect-ratio: 3 / 4`
- Background: `#B5B0A6` (אבן)
- `position: relative` (לבאדג'ים)

**תוכן (מתחת לתמונה, gap 12px):**

- **שם:** Karantina Bold 22px, line-height 1.05, צבע `#2B1810`
- **Caption:** Assistant Medium 11px, tracking 0.6px, צבע `#6B5544`
- **מחיר:** Karantina Bold 22px, צבע `#2B1810` (או `#7C1F26` אם בסייל)
- **מחיר מקורי (במחיקה):** Assistant 12px, `text-decoration: line-through`, צבע `#6B5544`

---

### Badges

מיקום: `position: absolute; top: 10px; right: 10px;` (right = start ב-RTL)
Padding: `4px 9px` · Font: Assistant SemiBold 9px, tracking 1.5px · Radius: `0`

| Variant | Background | Text      |
| ------- | ---------- | --------- |
| חדש     | `#C8932B`  | `#2B1810` |
| SALE    | `#7C1F26`  | `#ECE3D0` |

---

### Input Fields

**מצב בסיס:**

- Background: `#ECE3D0`
- Border: `1px solid #2B1810`
- Padding: `12px 14px`
- Font: Assistant Regular 14px, צבע `#2B1810`
- Placeholder: `#6B5544`
- Radius: `0`

**תווית (מעל הקלט, gap 6px):**

Assistant Medium 11px, tracking 1.5px, צבע `#2B1810`

**מצבים:**

- **Focus:** הבורדר מתעבה ל-`1.5px` ומשנה צבע ל-`#7C1F26`
- **Error:** בורדר `#C8243C`, טקסט הסבר מתחת באותו צבע

---

### Navigation

| מאפיין     | ערך                          |
| ---------- | ---------------------------- |
| Background | `#7C1F26` (רימון מלא)        |
| Text       | `#ECE3D0` (קרם)              |
| Padding    | `14px 24px`                  |
| Layout     | flex, space-between          |

**לוגו (מימין ב-RTL):**

`LOVEsh\et` ב-Karantina Bold 30px. ״LOVEsh״ ו-״et״ ב-`#ECE3D0`, הקו האלכסוני ״\״ ב-`#C8932B` (חתימת המותג — משחק מילים דו-לשוני: ״LOVE״ + ״לובש / לובשת״).

**קישורים (משמאל ב-RTL):**

Assistant Medium 13px, צבע `#ECE3D0`. ״סייל״ מודגש ב-`#C8932B`.

**אייקונים:**

Tabler outline-style, 17px, צבע `#ECE3D0`.

---

## CSS Variables

קובץ tokens מוכן להעתקה ל-`:root`:

```css
:root {
  /* Colors */
  --color-primary: #7C1F26;
  --color-secondary: #2B1810;
  --color-accent: #C8932B;
  --color-complementary: #5A6328;
  --color-background: #ECE3D0;
  --color-surface: #B5B0A6;
  --color-text-primary: #2B1810;
  --color-text-secondary: #6B5544;
  --color-error: #C8243C;
  --color-success: #5A6328;

  /* Typography */
  --font-display: 'Karantina', sans-serif;
  --font-body: 'Assistant', sans-serif;

  --text-h1: 78px;
  --text-h2: 42px;
  --text-h3: 22px;
  --text-body-lg: 16px;
  --text-body: 14px;
  --text-caption: 11px;

  /* Spacing scale (8px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Radius */
  --radius: 0;

  /* Letter spacing */
  --tracking-caption: 0.6px;
  --tracking-label: 2.5px;
  --tracking-btn: 1.2px;
}

body {
  font-family: var(--font-body);
  background: var(--color-background);
  color: var(--color-text-primary);
  direction: rtl;
}

h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 700;
}
```

---

## Font Imports

טען את הפונטים מ-Google Fonts ב-`<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600;700&family=Karantina:wght@700&display=swap" rel="stylesheet">
```

---

## Sample Content

| Badge | Product             | Caption                  | Price              |
| ----- | ------------------- | ------------------------ | ------------------ |
| חדש   | ג'קט ג'ינס אוברסייז | Levi's · M · מצב מעולה   | 89 ₪               |
| SALE  | חולצת ראפ 90s      | Bootleg · L · טוב        | ~~80 ₪~~ 45 ₪      |
| —     | סניקרס דאד-שוז     | New Balance · 42 · טוב   | 120 ₪              |

**טקסטים:**

- **Pre-headline:** `HARVEST · קולקציית סתיו`
- **H1 hero:** `וינטג' לא יוצא [מהאופנה.]` — הסוגריים מסמנים את המילה המודגשת בזית
- **Body:** `חנות יד-שנייה לקהל שיודע מה הוא רוצה. פריטים נבחרים אחד-אחד, מצב מעולה, מחירים שלא תאמיני שהם אמיתיים.`
- **CTAs:** `קני עכשיו ←` / `איך זה עובד`
- **Section header:** `החדש בחנות`
- **Newsletter headline:** `אל תפספסי את ה[דרופ] הבא` — ״דרופ״ מודגש בזעפרן
- **Newsletter subline:** `ניוזלטר פעם בשבועיים · בלי ספאם`

---

*LOVEsh\et Design System · Pomegranate Garden · v1.0*
