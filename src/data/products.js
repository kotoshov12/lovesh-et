// Mock catalogue for LOVEsh\et. All data is placeholder — no backend.
// Images are reused from the Stitch reference exports.

const IMG = {
  rapTee:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA0Tb72Nuko3WjnpQCyF2xCS7k3kR9CmQ7hvKI3X2ov-MErcPRLOUGwE8nFzx-FYsmPVRy6TVNzrCm8_ctLNNSgiaY31LKHva_YlHH-Aj8wGwAjvU3X2emA3Q0-jPElmhe0L0oayuS0uveoE8sFG3YYjLGdtLoMRZpKNPjMaY29uw6IKHgz0ZsJebadti5RQMdmonjEM1Ve4mzIQUhkDmq1IZZ4HBdwCYiqBLnvThwsAOOplaJrXZ0D_Df4XZRPOswXtRSFTncsKMkY',
  denimJacket:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAYeMnREZ20p-JffX41-_FK87BHjUjrAz4eoYRaH_CjxvLjCRkN4zdqpE0ZPcpfz2oKzUrusAdMSrnqwgzIGijqRHf9egC8_z-6l5GlmjHHtVdvG_d1gxzuLt19R1Wwo65lFcLMtNrrf_TMfDqcIwMS7OpTTaDGpJMdJgScyXFChe3UCyN1zZCT9FgXl90N4DzmLU7DnD4_IIVqlQIsi8-n-3CPWlY_x0sawcIanKDPBGdzBFkB2AprhTOArHpJXNRgUC2CvQdKcqQW',
  sneakers:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAv-s355htyJuGooCQIoT5L4LboTBb5HpmgzQeAkB2lMBwX3NUfRAMFjrR2530-D5GXG0F9mhz3gKYdLV4MK7iHIZaQunL7QnBngWD22r9LS6t529aOELh_Lkj72ZT39jfXrlRsJxKQlisqsbMRnbZplkhWwpaEy__QW69K4zld1wlx3L505_EFwwdF-5GKe9AXDv1MOuuVlKpP4wEguCi5r5kiMO-g_htLQdo8Lz1VOXkslz3PPdXqEXyH1PqcmRssXwTCSk8-k3o4',
  windbreaker:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA-_iyYn8zLJ1B7MxHtu0jKMvD6Pouit1jEoakV6xUgQd0Srobhua0QwYuFXKtFUv4MiEp8jXn9Lrwgw2THBVLaECEgLOjqWSFioW3VB3X6Tt0aBeEtrLqZiGofN931xKRbB8ulJ7mM8NDDc2UxehCrcS5K-dCiXJ5RkndiXdXisg-GFp5G8Ey4R-1B3Fwd7yj7BNiFp7HzTeHScG4KQQsTAS4fvvvr9xhVXDavvN3XQxvQ4JhWZRmPh3uEkHNWAm9vybv_t1xDhg',
  linenShirt:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA-yg0YtTPZsq0mNzze2QVszZ--X7XWh6LQHyaRqBWBOGSXmsK8FmRDIS1c0JSNxv-1-asp5fu3yNekhmpgum08YjZZJpvms0TT6jFKy9mDkq5aKTHkRelD5pDpCEFcWAVyorYvT_aHcy40PwQG32oZP01bWEXgR72raRZDfxpLGzvU1ioEsK9wa8NPjSe_appvqtKvwI0oRfwo21Ztbir612lJQRBT3RIOtGeGWY0THmreb4kwsb8g0UUA_QeUSTsAZ21ygDb3Oi4U',
  belt:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCIttsmJTjntyogPQXfBeL4aWNM5i9LE3ogzp-Mg6zLWYjQ5DDg5lJNCHnKiZVXk3S2Fugqv46VB7aCspRkPARfE4ove52RfqqzU3ZzeqrNMApCtZpo5wh0SoP2PiTOyXxOL_gvajG3uCSOf1e4diTeU7cOABEWE45sNSIgW-0rKePCJIzm-r34KzPcvjuMQW1idtGgyrXsiNf9GitRWzmY4WmPFxnG2xKvzS_dncjbTFOD7yXr36iyjR8DJJso785xg0hqlbyTWq5P',
  trousers:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD7jCb-IF23v4g0oaXrIwcqTFH3hP9C10bcuuM_o5JOG0TxAd6348V9Jqgeo9DXKWzF7K_DCM3VsJUhtxjnN5PrZlliju7-JElUy9Ey_gTCZzN46Ie-ggxk_rCkD-XQvRX9xOmkTYMn-BxksapKU0eZ4uWsearX3JGqgvr_iGHuDGBypJ_NNBm0YCh6IuoCp9-gmyYxsvts-OIbhU5_1t9htwIYyjyhxxDXnOfu_iDmVI8_amd5jvaBkW4FDOQKdnSheZcgCfVRvqda',
  loafers:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuChVZAANec5TQmM4AH9z5xCFnCL5vsuY8YnU5k61tgw8PYKIIDypKw8VZhgjXEJioOR2xtZiRlKEdsDZZYU_yt3cjRgAXEipRZ7EUYzxstS0kSrXjjAyRZRSJ8RSs2zvQdfm36CISRZzTIBg_T2aIsakkpHRz4UgavUg6D8shkbPSDmogz9IlSoCOjhmYOxpC8Jz6_Tyjz3e9rCihbUc12yzxyzqcM4jvBqXVHY0O85_QYEyPo6yQpuwlu3HnBphjzlIETiMpUMRqIy',
  heroLeather:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDLF8BTRTCSpYJbwtWqmUD9NJQJlJUWYR5o5TD5BfuvDS3nRzwzUFC6M3NE616fGvQPckuGHX_Q_GS6bqhQprCwz3XmFz3h_JlbjxjiHWXEJGQ1ZFUqAaLV-U_Hn1RREBqVd-XfQfNvEbWGDsXItpBhnGBwOXDz1wEkY4uJga8xfFX5wHU2AKeuIv9741nijqELxYj4mjCHH7foLDf4xdvyf3FdeLjz3mJYwEjP4f2Bz3hFhVQJOShodtxZS-A3j6146RhvH_cXPPEo',
  detailMain:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBFEyPUIGq3Yh_h5pr7wBsCn2ETzPiKjAT3CHEuYNTaDoIv62kzIhMlmArWg77EuVVZzMF9rDZ-0RLYHrLxgnrzMmGggm7IQ6fS3tlQKU5hKw_Lx-gCswIXrAIfgF5slhL5BiVobY3NjIIXbyUwfRfEHoRu-XPt0_gWB_n-xH_eCsxjgWhrtrEPWhu_6Q85oqe0XLPwWdC0XTP-UGvnbvvkaO21mPe8thr9HvbDbiZnKUwFqEtwtTiu9qi4dmXNpP6lOmrPP0C4YBDk',
  detailB:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAi8WZF_ceIHTJVeERK-fdrtAEtifm7jCLcdmg8qtoG2tjmVnDG9UHONI-MKVafaqOfJHWLh1gt5sNtSxQrwtVKZeER14Ac3ZR45K_qBu5Tj-L7LzpClXzZ5FhoBxJTr1BD2WvZepju3h5r43GbVW0QhKcsQmMXiZd6ti7XXOwSc6Z_k8318YKWtZtQI6XMKSv_1X5X1x2v2R6c27RDKQ1BpRd9PXAcmPVn2NneQUGMaoaxU1hQKp5w96puAo-TAKB3uEmNaSYgrLO9',
  detailC:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA5IGy5GubTvFVOu6nQSVBgvr3wLweS7TXRMGe_a4gDRJ4mtZCjOMaTf5p3FGRfRQNyuAlgp5nOIII-kNcexY_hWldGEbYXXwvuinSW3l0M6spQQXH2jngIoI5vpngvcQcoL2_WkWu_syzMwR9OcKDQpS09YBkmxRCalzxaN6R7ET94-n7hDdQySxVVrZdqqmU5SDHKPH1SoO7T6-eZQrWA6boxcHor5f71lnB_NloCYCh6TbMRpEXo64c6HkS0YZIADeDLwoeavwPg',
  sellerMaya:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDeCBoJWy80yaTibWW2EAayR9qX7uwvzDgCg4B5fSxVn8dlbYvnsFJJDBVUKTsoPHuiHc6zSqQgudtgJe0vqisrAL92U_BplkFnvHiOUy2z-nl02Ls516tmlolHaGEl0Y1KhAuF1lL1TLD6k8EbB_Y9qnivkDBEUrCehIb9t3bx3Y7b2x4K2NXfyaBvjm6C4cX5fxX6zQMtVJqynkG0BrxGhIj7UgFf4qmB-yKHAI1RPrm2lfC1iPKTl8f4oxzMVkldfJMmJ-rxBeWr',
}

export const products = [
  {
    id: 'rap-tee-90s',
    name: "חולצת ראפ 90s",
    image: IMG.rapTee,
    price: '₪45',
    original: '₪80',
    badge: { text: 'SALE', variant: 'sale' },
    distance: '2.4 ק"מ',
    caption: 'Bootleg · L · מצב טוב',
    favorite: false,
    brand: 'Bootleg',
    size: 'L',
    condition: 'מצב טוב',
    eyebrow: 'HARVEST · אספנות',
    description:
      'חולצת ראפ מקורית משנות ה-90, הדפס בוטלג נדיר. בד כותנה כבד ואיכותי, גזרה אוברסייז. פריט אספנים אמיתי במצב טוב מאוד.',
    gallery: [IMG.rapTee, IMG.detailB, IMG.detailC],
  },
  {
    id: 'levis-denim-jacket',
    name: "ג'קט ג'ינס Levi's",
    image: IMG.denimJacket,
    price: '₪89',
    original: '₪140',
    distance: '1.2 ק"מ',
    caption: "Levi's · M · מצב מעולה",
    favorite: false,
    brand: "Levi's",
    size: 'M',
    condition: 'מצב מעולה',
    eyebrow: 'HARVEST · אספנות',
    description:
      "ג׳קט ג׳ינס קלאסי משנות ה-90, במצב מושלם ללא פגמים. בד ג׳ינס עבה ואיכותי שרק משתבח עם השנים. הגזרה מעט אוברסייז ומתאימה בול לעונה. פריט חובה לכל חובבת וינטג׳ אמיתית.",
    gallery: [IMG.detailMain, IMG.detailB, IMG.detailC],
  },
  {
    id: 'new-balance-sneakers',
    name: 'סניקרס New Balance',
    image: IMG.sneakers,
    price: '₪120',
    badge: { text: 'חדש', variant: 'new' },
    distance: '5.8 ק"מ',
    caption: 'New Balance · 42 · טוב',
    favorite: false,
    brand: 'New Balance',
    size: '42',
    condition: 'מצב טוב',
    eyebrow: 'קולקציית רחוב',
    description:
      'סניקרס דאד-שוז של New Balance, דגם קלאסי בגוון ניטרלי. נוחות יוצאת דופן וסטייל על-זמני. מידה 42, מצב טוב עם סימני שימוש מינוריים.',
    gallery: [IMG.sneakers, IMG.detailB, IMG.detailC],
  },
  {
    id: 'vintage-windbreaker',
    name: "מעיל רוח וינטג'",
    image: IMG.windbreaker,
    price: '₪150',
    distance: '0.5 ק"מ',
    caption: 'Vintage · L · מצב מעולה',
    favorite: true,
    brand: 'Vintage',
    size: 'L',
    condition: 'מצב מעולה',
    eyebrow: 'קולקציית רחוב',
    description:
      'מעיל רוח וינטג׳ צבעוני בסטייל שנות ה-90. בד קל ועמיד, אידיאלי לערבי הסתיו. גזרה רחבה ונוחה, מצב מעולה.',
    gallery: [IMG.windbreaker, IMG.detailB, IMG.detailC],
  },
  {
    id: 'classic-linen-shirt',
    name: 'חולצת פשתן קלאסית',
    image: IMG.linenShirt,
    price: '₪349',
    badge: { text: 'חדש', variant: 'new' },
    distance: '2.4 ק"מ',
    caption: 'פשתן · M · חדש עם תווית',
    favorite: false,
    brand: 'Zara',
    size: 'M',
    condition: 'חדש עם תווית',
    eyebrow: 'קולקציית קיץ 2024',
    description:
      'חולצת פשתן יוקרתית בגזרה נינוחה, עשויה מ-100% פשתן טבעי שנבחר בקפידה. פריט על-זמני שמשלב בין נוחות מקסימלית לבין אסתטיקה מוקפדת.',
    gallery: [IMG.linenShirt, IMG.detailB, IMG.detailC],
  },
  {
    id: 'handmade-leather-belt',
    name: 'חגורת עור בעבודת יד',
    image: IMG.belt,
    price: '₪189',
    original: '₪249',
    badge: { text: 'SALE', variant: 'sale' },
    distance: '0.8 ק"מ',
    caption: 'עבודת יד · One Size · מצב מעולה',
    favorite: false,
    brand: 'Handmade',
    size: 'One Size',
    condition: 'מצב מעולה',
    eyebrow: 'אקססוריז',
    description:
      'חגורת עור אמיתי בעבודת יד עם אבזם פליז כבד. גוון חום שוקולד עשיר שמתאים לכל לוק. פריט איכותי שנעשה להחזיק שנים.',
    gallery: [IMG.belt, IMG.detailB, IMG.detailC],
  },
  {
    id: 'tailored-trousers',
    name: 'מכנסיים מחויטים',
    image: IMG.trousers,
    price: '₪420',
    distance: '5.1 ק"מ',
    caption: 'מחויט · 38 · מצב מעולה',
    favorite: false,
    brand: 'Vintage',
    size: '38',
    condition: 'מצב מעולה',
    eyebrow: 'קולקציית קיץ 2024',
    description:
      'מכנסיים מחויטים בגזרה גבוהה, גוון חול חם. בד איכותי שנופל מצוין. אלגנטיים ונוחים, מתאימים ליום ולערב.',
    gallery: [IMG.trousers, IMG.detailB, IMG.detailC],
  },
  {
    id: 'classic-loafers',
    name: 'נעלי לופרס קלאסיות',
    image: IMG.loafers,
    price: '₪580',
    badge: { text: 'אחרון במלאי', variant: 'last' },
    distance: '1.2 ק"מ',
    caption: 'עור · 40 · כמו חדש',
    favorite: false,
    brand: 'Leather Co.',
    size: '40',
    condition: 'כמו חדש',
    eyebrow: 'אקססוריז',
    description:
      'נעלי לופרס מעור אמיתי בגוון אדום רימון עמוק. עיצוב קלאסי ועל-זמני, מצב כמו חדש. פריט סטייטמנט אמיתי.',
    gallery: [IMG.loafers, IMG.detailB, IMG.detailC],
  },
]

export const sellers = {
  default: {
    name: 'מאיה ק.',
    avatar: IMG.sellerMaya,
    location: 'תל אביב',
    distance: '2.4 ק"מ',
  },
}

export const heroSlide = {
  eyebrow: 'HOT NOW',
  title: "חולצת וינטג' נדירה מהניינטיז",
  image: IMG.rapTee,
  price: '₪180',
  original: '₪240',
}

export const heroSplit = {
  eyebrow: 'VINTAGE COLLECTION 2024',
  title: 'וינטג׳ לא יוצא מהאופנה',
  body: 'גלו את הקולקציה החדשה שנחתה היישר מרחובות מילאנו. פריטי וינטג׳ נדירים שנבחרו בקפידה עבור הסטייל האישי שלך.',
  image: IMG.heroLeather,
  ctaText: 'לרכישת הקולקציה',
  tag: 'מהדורת פרימיום',
}

export function getProduct(id) {
  return products.find((p) => p.id === id)
}

export function getSimilar(excludeId, count = 4) {
  return products.filter((p) => p.id !== excludeId).slice(0, count)
}
