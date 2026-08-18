import {Config} from "@/src/common/config/Config.js";
import {createGateway} from "@ai-sdk/gateway";

// AI Gateway does NOT have markup on their prices.
// https://vercel.com/docs/ai-gateway/pricing
// https://vercel.com/ai-gateway/models
// "anthropic/claude-opus-4.5"				// in= $5.00/M, out= $25.00/M
// "anthropic/claude-opus-4.6"				// in= $5.00/M, out= $25.00/M
// "anthropic/claude-opus-4.7"				// in= $5.00/M, out= $25.00/M
// "anthropic/claude-opus-4.8"				// in= $5.00/M, out= $25.00/M
// "google/gemini-2.5-pro"					// in= $2.50/M, out= $15.00/M
// "google/gemini-2.5-flash"				// in= $0.30/M, out=  $2.50/M
// "google/gemini-3-flash"					// in= $0.30/M, out=  $2.50/M
// "google/gemini-3-pro-preview"			// in= $2.00/M, out= $12.00/M
// "google/gemini-3.1-flash-lite-preview"	// in= $0.10/M, out=  $1.50/M
// "openai/gpt-4o"							// in= $2.50/M, out= $10.00/M
// "openai/gpt-5-nano"						// in= $0.05/M, out=  $0.40/M
// "openai/gpt-5"							// in= $1.25/M, out= $10.00/M
// "openai/gpt-5.2"							// in= $1.75/M, out= $14.00/M
// "openai/gpt-5.2-pro"						// in=$15.00/M, out=$120.00/M
// "openai/gpt-5.4"							// in= $2.50/M, out= $15.00/M
// "openai/gpt-5.5"							// in= $5.00/M, out= $30.00/M
// "openai/gpt-5.5-pro"						// in=$30.00/M, out=$180.00/M

// OpenRouter adds 5% fee to prices listed!
// https://openrouter.ai/models
// https://openrouter.ai/announcements/simplifying-our-platform-fee

export const aiGateway = createGateway({
	apiKey: Config.Vercel_AiGateway_Key,
});
