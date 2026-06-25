-- =============================================================================
-- seed_fix.sql — corrects the marketplace seed data.
-- Run ONCE in the Supabase SQL editor (safe to re-run; it clears its own rows).
--   * replaces the 10 mismatched Unsplash products with verified ones
--     (image content matches the item; e.g. a skirt photo for a skirt)
--   * fixes seller avatars so the photo matches the name's gender
--   * adds random reviews
-- Leaves the original 8 catalogue products untouched.
-- =============================================================================

-- 1) Remove the previous Unsplash seed (the mismatched batch) ------------------
delete from public.products where image like '%images.unsplash.com%';
delete from public.sellers  where avatar like '%images.unsplash.com%';

-- 2) Sellers (avatars matched to gender) --------------------------------------
insert into public.sellers (name, avatar, location, distance) values
  ('דנה לוי',  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80', 'תל אביב', '1.1 ק"מ'),
  ('יעל כהן',  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80', 'חיפה',    '3.6 ק"מ'),
  ('רוני ברק', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80', 'ירושלים', '4.2 ק"מ'),
  ('איתי שלו', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80', 'רמת גן',  '2.0 ק"מ');

-- 3) Products (image verified to match the item) ------------------------------
insert into public.products
  (name, category, price, original_price, brand, size, condition, caption, eyebrow, description, distance, badge_text, badge_variant, image, gallery, seller_id)
values
  ('טי-שירט גרפי וינטג''', 'חולצות', 60, null, 'Vintage', 'M', 'מצב טוב', 'Vintage · M · מצב טוב', 'סטריטוור',
   'טי-שירט גרפי בגוון קרם עם הדפס וינטג''. כותנה רכה, גזרה רגילה.', '1.1 ק"מ', null, null,
   'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&q=80',
   ARRAY['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&q=80'],
   (select id from public.sellers where name='דנה לוי')),

  ('חולצת טי לבנה בייסיק', 'חולצות', 45, null, 'Basic', 'L', 'כמו חדש', 'Basic · L · כמו חדש', 'בייסיק',
   'חולצת טי לבנה קלאסית, כותנה 100%. הבסיס לכל ארון.', '4.2 ק"מ', null, null,
   'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&q=80',
   ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&q=80'],
   (select id from public.sellers where name='רוני ברק')),

  ('ג''ינס מאמא Levi''s', 'מכנסיים', 110, 160, 'Levi''s', 'M', 'מצב טוב', 'Levi''s · M · מצב טוב', 'דנים',
   'ג''ינס מאמא בגזרה גבוהה, כותנה עבה ואותנטית. קלאסיקה שלא נגמרת.', '1.1 ק"מ', 'מבצע', 'sale',
   'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop&q=80',
   ARRAY['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop&q=80'],
   (select id from public.sellers where name='דנה לוי')),

  ('שמלת ערב אדומה', 'שמלות', 180, null, 'Mango', 'S', 'מצב מעולה', 'Mango · S · מצב מעולה', 'ערב',
   'שמלת ערב אדומה דרמטית בגזרה מחמיאה. לאירועים מיוחדים.', '3.6 ק"מ', 'חדש', 'new',
   'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=800&fit=crop&q=80',
   ARRAY['https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=800&fit=crop&q=80'],
   (select id from public.sellers where name='יעל כהן')),

  ('שמלת קוקטייל סגולה', 'שמלות', 150, 220, 'Zara', 'M', 'מצב מעולה', 'Zara · M · מצב מעולה', 'ערב',
   'שמלת קוקטייל סגולה עם כתף חשופה, גזרה צמודה ואלגנטית.', '3.6 ק"מ', 'מבצע', 'sale',
   'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop&q=80',
   ARRAY['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop&q=80'],
   (select id from public.sellers where name='יעל כהן')),

  ('חצאית מידי פליסה', 'חצאיות', 65, 90, 'Vintage', 'S', 'מצב טוב', 'Vintage · S · מצב טוב', 'קיץ',
   'חצאית מידי פליסה מתנפנפת בגוון חום-בז''. נהדרת ליום ולערב.', '3.6 ק"מ', 'מבצע', 'sale',
   'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&h=800&fit=crop&q=80',
   ARRAY['https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&h=800&fit=crop&q=80'],
   (select id from public.sellers where name='יעל כהן')),

  ('סניקרס ואנס בורדו', 'נעליים', 130, null, 'Vans', '40', 'מצב טוב', 'Vans · 40 · מצב טוב', 'הנעלה',
   'סניקרס ואנס בגוון בורדו עם פס לבן קלאסי. נשברו בול.', '4.2 ק"מ', null, null,
   'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=800&fit=crop&q=80',
   ARRAY['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=800&fit=crop&q=80'],
   (select id from public.sellers where name='רוני ברק')),

  ('ז''קט ג''ינס אוברסייז', 'מעילים', 95, null, 'Vintage', 'L', 'מצב מעולה', 'Vintage · L · מצב מעולה', 'אאוטרוור',
   'ז''קט ג''ינס אוברסייז עם צווארון שרפה. חמים וסטייליסטי.', '2.0 ק"מ', 'חדש', 'new',
   'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&h=800&fit=crop&q=80',
   ARRAY['https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&h=800&fit=crop&q=80'],
   (select id from public.sellers where name='איתי שלו')),

  ('מעיל בומבר חום', 'מעילים', 180, null, 'Zara', 'M', 'כמו חדש', 'Zara · M · כמו חדש', 'אאוטרוור',
   'מעיל בומבר בגוון חום-חלודה, בד קל ועמיד. גזרה נקייה.', '2.0 ק"מ', null, null,
   'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=800&fit=crop&q=80',
   ARRAY['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=800&fit=crop&q=80'],
   (select id from public.sellers where name='איתי שלו')),

  ('תיק קרוסבודי שחור', 'אקססוריז', 130, null, 'Designer', 'One Size', 'מצב מעולה', 'Designer · One Size · מצב מעולה', 'אקססוריז',
   'תיק קרוסבודי שחור מרוכפת עם שרשרת זהב. קומפקטי ומחזיק הכל.', '1.1 ק"מ', null, null,
   'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&q=80',
   ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&q=80'],
   (select id from public.sellers where name='דנה לוי'));

-- 4) Reviews: allow seed (anonymous-author) rows + a display name -------------
alter table public.reviews alter column author_id drop not null;
alter table public.reviews add column if not exists author_name text;

delete from public.reviews where author_id is null;  -- idempotent re-seed

insert into public.reviews (seller_id, author_name, rating, body)
select s.id, v.author_name, v.rating, v.body
from public.sellers s
cross join (values
  ('מיכל ר.', 5, 'מוכר/ת מהמם/ה, הפריט הגיע בדיוק כמו בתמונה. ממליצה בחום!'),
  ('עידן כ.', 4, 'תקשורת נעימה ומהירה, העסקה עברה חלק.'),
  ('שירה פ.', 5, 'איכות מעולה ומחיר הוגן, אשמח לקנות שוב.')
) as v(author_name, rating, body);
