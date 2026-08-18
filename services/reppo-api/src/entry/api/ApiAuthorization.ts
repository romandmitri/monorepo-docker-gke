export enum ApiAuthorization {
	// Internal.

	Developer = "developer",
	Public = "public",
	JwtHeader = "jwt-header",
	JwtQuery = "jwt-query",

	// External.

	// https://docs.firecrawl.dev/webhooks/security
	FirecrawlWebhook = "firecrawl-webhook",

	// https://help.gohighlevel.com/support/solutions/articles/155000003305-workflow-action-custom-webhook#Authentication-Options
	GoHighLevelWebhook = "go-high-level-webhook",

	// https://docs.retellai.com/features/secure-webhook
	RetellWebhook = "retell-webhook",

	// https://docs.stripe.com/webhooks/signatures
	StripeWebhook = "stripe-webhook",
}
