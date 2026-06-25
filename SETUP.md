# LOVEsh\et — מה צריך להגדיר (פעולות ידניות)

רשימה מסודרת של כל מה שצריך לעשות ב-Supabase וב-Vercel כדי שהאתר יעבוד מלא בפרודקשן.
סדר מומלץ מלמעלה למטה.

---

## 1. Supabase — מסד נתונים (SQL Editor)

הריצי את קבצי ה-SQL מתיקיית `supabase/` לפי הסדר (כל אחד פעם אחת):

1. `schema.sql` — טבלאות בסיס (products, sellers), Storage, RLS ✅ (כבר רץ)
2. `seed.sql` — נתוני התחלה ✅ (כבר רץ)
3. `migration_user_id.sql` — שיוך מוצר למשתמש ✅
4. `migration_category.sql` — קטגוריות ✅
5. `migration_sold.sql` — סימון "נמכר"  ← **להריץ אם עוד לא**
6. `migration_messages.sql` — צ'אט קונה⇄מוכר  ← **להריץ אם עוד לא**
7. `migration_v2.sql` — הזמנות, ביקורות, התראות  ← **חדש, להריץ**

## 2. Supabase — Storage

- Dashboard → **Storage** → **New bucket** → שם: `product-images` → סמני **Public**.
- נחוץ להעלאת תמונות מוצר ותמונת פרופיל.

## 3. Supabase — Authentication → URL Configuration

- **Site URL** = `https://lovesh-et.vercel.app`
- **Redirect URLs** (הוסיפי את שתיהן):
  - `https://lovesh-et.vercel.app/**`
  - `http://localhost:5173/**`
- מתקן את ההפניה של התחברות Google.

## 4. Supabase — Google Provider (אם רוצים התחברות Google)

- Authentication → Providers → **Google** → להפעיל + Client ID/Secret מ-Google Cloud.
- ב-Google Cloud → Authorized redirect URI: `https://redrpkvanlzyivlroqzn.supabase.co/auth/v1/callback` ✅

## 5. חשבונות התחברות אמיתיים (4 משתמשים)

יצירת משתמשים שמתחברים מיד דורשת אישור-אימייל. הכי פשוט ובטוח — דרך הדאשבורד:

- Authentication → **Users** → **Add user** → הזיני אימייל + סיסמה → **סמני "Auto Confirm User"** → Create.
- חזרי על זה 4 פעמים. הצעה:
  | אימייל | סיסמה |
  | --- | --- |
  | dana@loveshet.app  | loveshet123 |
  | yael@loveshet.app  | loveshet123 |
  | roni@loveshet.app  | loveshet123 |
  | maya@loveshet.app  | loveshet123 |

*(לחלופין: אם תיתני לי את ה-`service_role` key אני אריץ סקריפט שיוצר אותם מאושרים אוטומטית — אבל זה מפתח רגיש מאוד; לא לשתף בפומבי ולסובב אותו אחרי.)*

## 6. Vercel — Environment Variables

Project → Settings → Environment Variables (לכל הסביבות), ואז **Redeploy**:

```
VITE_SUPABASE_URL        = https://redrpkvanlzyivlroqzn.supabase.co
VITE_SUPABASE_ANON_KEY   = <ה-anon key>
VITE_CLARITY_ID          = xclhttjdf9
VITE_SENTRY_DSN          = https://147942c961fdb5a2f9fec8fa2d333813@o4511626508173312.ingest.us.sentry.io/4511626512498688
```

## 7. Vercel — Analytics

- Project → טאב **Analytics** → **Enable** (אין מפתח).

---

חשוב: `VITE_*` נצרבים בזמן ה-build, אז **כל שינוי משתנה ב-Vercel דורש Redeploy**.
