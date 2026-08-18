export enum HttpHeader {
	// Standard.

	Accept = "accept",
	Authorization = "authorization",
	ContentType = "content-type",

	// Custom.

	CloudFlareConnectingIP = "cf-connecting-ip",
	CloudFlareIpCountry = "cf-ipcountry",

	// https://docs.firecrawl.dev/webhooks/security
	FirecrawlSignature = "x-firecrawl-signature",

	// https://help.gohighlevel.com/support/solutions/articles/155000003305-workflow-action-custom-webhook#Authentication-Options
	GoHighLevelApiKey = "x-api-key",
	// https://docs.retellai.com/features/secure-webhook
	RetellSignature = "x-retell-signature",

	XForwardedFor = "x-forwarded-for",

	XTraceId = "x-trace-id",

	// https://docs.stripe.com/webhooks/signatures
	StripeSignature = "stripe-signature",
}
