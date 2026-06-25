// Canonical product categories — shared by the Shop filters, the upload form,
// and the header navigation so the data stays consistent everywhere.

export const CATEGORIES = [
  'חולצות',
  'מכנסיים',
  'שמלות',
  'חצאיות',
  'נעליים',
  'מעילים',
  'אקססוריז',
]

// Subset shown as links in the top header (matches the reference design).
export const NAV_CATEGORIES = ['חולצות', 'מכנסיים', 'נעליים', 'אקססוריז']

// Style / length sub-options per category — powers the advanced filter.
// Filtering is keyword-based against the item's name / caption / description.
export const SUBCATEGORIES = {
  חולצות: ['טי-שירט', 'מכופתרת', 'סוודר', 'פרחונית', 'קרופ'],
  מכנסיים: ["ג'ינס", 'מחויט', 'קצר', 'מאמא'],
  שמלות: ['מיני', 'מידי', 'מקסי', 'ערב'],
  חצאיות: ['מיני', 'מידי', 'מקסי', 'פליסה'],
  נעליים: ['סניקרס', 'עקבים', 'מגפיים', 'כפכפים'],
  מעילים: ["ג'ינס", 'בומבר', "טרנץ'", 'פוך'],
  אקססוריז: ['תיקים', 'חגורות', 'תכשיטים', 'כובעים'],
}

