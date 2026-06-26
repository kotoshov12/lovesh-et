// Supabase Edge Function: email a purchase receipt via Resend.
//
// Setup:
//   1. Create a Resend account + API key (https://resend.com).
//   2. supabase secrets set RESEND_API_KEY=re_xxx
//      (optional) supabase secrets set RECEIPT_FROM="LOVEsh\et <receipts@your-domain>"
//   3. supabase functions deploy send-receipt
//
// The app calls it after an order is placed (see src/api/orders.js → sendReceipt).

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM = Deno.env.get('RECEIPT_FROM') || 'LOVEsh\\et <onboarding@resend.dev>'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email, items = [], total = 0, paymentMethod } = await req.json()
    if (!email) return json({ error: 'missing email' }, 400)
    if (!RESEND_API_KEY) return json({ error: 'RESEND_API_KEY not configured' }, 500)

    const rows = items
      .map(
        (i: { name: string; price: string }) =>
          `<tr><td style="padding:6px 0">${i.name}</td><td style="padding:6px 0;text-align:left">${i.price}</td></tr>`
      )
      .join('')

    const method = paymentMethod === 'bit' ? 'Bit' : 'תשלום במקום'
    const html = `
      <div dir="rtl" style="font-family:Arial,sans-serif;color:#2b1810;max-width:520px;margin:auto">
        <h1 style="color:#7c1f26;margin:0 0 4px">LOVEsh\\et</h1>
        <p style="color:#6b5544;margin:0 0 16px">הקבלה שלך · תודה על הקנייה!</p>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #ddc0bf">
          ${rows}
        </table>
        <p style="border-top:1.5px solid #2b1810;padding-top:10px;font-weight:bold">
          סה"כ: ₪${total} · אמצעי תשלום: ${method}
        </p>
        <p style="color:#6b5544;font-size:12px">
          זוהי קבלה לדוגמה ממרקטפלייס יד-שנייה. התשלום מתואם ישירות מול המוכר/ת.
        </p>
      </div>`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: email,
        subject: 'הקבלה שלך מ-LOVEsh\\et 🧾',
        html,
      }),
    })
    const data = await res.json()
    return json({ ok: res.ok, data }, res.ok ? 200 : 502)
  } catch (err) {
    return json({ error: String(err) }, 500)
  }
})
