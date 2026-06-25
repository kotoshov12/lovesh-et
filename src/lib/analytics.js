import * as Sentry from '@sentry/react'
import Clarity from '@microsoft/clarity'

/**
 * Initialise error monitoring (Sentry) and behaviour analytics (Microsoft
 * Clarity) from env vars. Each is a no-op when its key is absent, so local dev
 * stays quiet. Vercel Web Analytics is added separately via <Analytics/>.
 */
export function initMonitoring() {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (dsn) {
    Sentry.init({
      dsn,
      integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
      // Sample 10% of transactions; record replays on 10% of sessions + all errors.
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    })
  }

  const clarityId = import.meta.env.VITE_CLARITY_ID
  if (clarityId) {
    try {
      Clarity.init(clarityId)
    } catch (err) {
      console.warn('[clarity] init failed', err)
    }
  }
}
