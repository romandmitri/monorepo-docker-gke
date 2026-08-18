# TODO: WARNING - Do NOT delete secrets until after production deployment.
# TODO: WARNING - Do NOT delete secrets until after production deployment.
# TODO: WARNING - Do NOT delete secrets until after production deployment.

module "secrets_api" {
  source = "./looper"

  service = "reppo-api"
  secrets = [
    "REPPO_API_DATABASE_ANALYZE",
    "REPPO_API_DATABASE_URL",
    "REPPO_API_DEVELOPER_ACCESS",
    "REPPO_API_FIRECRAWL_API_KEY",        // "fc-abc123..."
    "REPPO_API_FIRECRAWL_WEBHOOK_SECRET", // HMAC-SHA256 from firecrawl.dev/app/settings?tab=advanced
    "REPPO_API_GOOGLE_CREDENTIALS",       // JSON for "project@cheese..." service account
    "REPPO_API_GOOGLE_STORAGE_PRIVATE",   // ie: "cheese-reppo-local-01", "cheese-reppo-c-stage-01", etc...
    "REPPO_API_JWT_DURATION",             // ie: "1m", "1h", "1d", "1w", "1y", etc...
    "REPPO_API_JWT_SECRET",
    "REPPO_API_LOGGER_FORMAT",         // ie: "json", "pretty"
    "REPPO_API_LOGGER_LEVEL",          // ie: "debug", "info", etc...
    "REPPO_API_NICKNAME",              // ie: "local-roman", "cluster-stage", "cluster-prod",
    "REPPO_API_POSTHOG_API_KEY",       // "phc_..."
    "REPPO_API_POSTMARK_SERVER_TOKEN", // ie: 123...
    "REPPO_API_SHORT_DOMAIN",          // ie: "link.cheese.app"
    "REPPO_API_SHORT_KEY",             // ie: "sk_ABC..."
    "REPPO_API_STRIPE_SECRET_KEY",     // "sk_test_..." or "sk_live_..."
    "REPPO_API_STRIPE_WEBHOOK_SECRET", // "whsec_..." from Stripe Dashboard webhook endpoint
    "REPPO_API_TWILIO_ACCOUNT_SID",    // ie: AC123...
    "REPPO_API_TWILIO_AUTH_TOKEN",     // ie: 123...
    "REPPO_API_TWILIO_FROM_NUMBER",    // ie: "+1844..."
    "REPPO_API_URL_BASE",              // ie: http://localhost:2000, https://reppo-stage.cheeseindustries.ca, https://cheeseindustries.ca
    "REPPO_API_VERCEL_AI_GATEWAY_KEY", // "vck_abc123...."
    "REPPO_API_WORKOS_API_KEY",
    "REPPO_API_WORKOS_CLIENT_ID",
    "REPPO_API_WORKOS_COOKIE_PASSWORD",
  ]
}

module "secrets_dashboard" {
  source = "./looper"

  service = "reppo-dashboard"
  secrets = [
    "REPPO_DASHBOARD_DEVELOPER_ACCESS",
    "REPPO_DASHBOARD_POSTHOG_KEY",            // "phc_123..."
    "REPPO_DASHBOARD_STRIPE_PUBLISHABLE_KEY", // "pk_test_..." or "pk_live_..."
    "REPPO_DASHBOARD_URL_BASE",               // http://localhost:2000, https://reppo-stage.cheeseindustries.ca, https://cheeseindustries.ca
    "REPPO_DASHBOARD_WORKOS_CLIENT_ID",
  ]
}

module "secrets_migrate" {
  source = "./looper"

  service = "reppo-migrate"
  secrets = [
    "REPPO_MIGRATE_DATABASE_URL",
  ]
}

module "secrets_proxy" {
  source = "./looper"

  service = "reppo-proxy"
  secrets = []
}

module "secrets_website" {
  source = "./looper"

  service = "reppo-website"
  secrets = [
    "REPPO_WEBSITE_POSTMARK_SERVER_TOKEN",
    "REPPO_WEBSITE_RETELL_API_KEY",
    "REPPO_WEBSITE_STRIPE_SECRET_KEY",
    "NEXT_PUBLIC_REPPO_WEBSITE_BOOKING_URL",
    "NEXT_PUBLIC_REPPO_WEBSITE_POSTHOG_KEY",
    "NEXT_PUBLIC_REPPO_WEBSITE_STRIPE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_REPPO_WEBSITE_URL_BASE",
  ]
}
