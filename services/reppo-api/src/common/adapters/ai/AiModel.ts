import {aiGateway} from "@/src/common/adapters/ai/ai.js";
import {ContextTracer} from "@/src/entry/_/ContextTracer.js";
import {GatewayModelId} from "@ai-sdk/gateway";
import {createRetryable} from "ai-retry";

export type LanguageModel = ReturnType<typeof aiGateway>;

export type AiModel = GatewayModelId;

export type AiModelInfo = {
	model: LanguageModel;
	retries: LanguageModel[];
};

const register = (...models: AiModel[]): AiModelInfo => {
	return {
		model: aiGateway(models[0]),
		retries: models.map((m) => aiGateway(m)), // always retry 1st model
		// retries: models.slice(1).map((m) => aiGateway(m)),
	};
};

// Check the latest list here!
// https://openrouter.ai/models
// https://vercel.com/ai-gateway/models

/**
 * For now, it makes sense to keep all used models in the same place.
 * This way easier to find DEPRECATED models.
 */

export const AiModel = {
	AgentUpdate_Intaker: register("openai/gpt-5.1-instant"),
	AgentUpdate_Intaker_Suggestions: register(
		// "google/gemini-2.5-flash",
		"openai/gpt-5.1-instant",
	),
	AgentUpdate_Scheduler: register("openai/gpt-5.5"),
	AgentUpdate_Director: register(
		// Keep this fast and judgment-focused; it only selects the next workflow action.
		"google/gemini-3-flash",
		"openai/gpt-5.4",
	),
	AgentUpdate_Executor: register(
		// "google/gemini-2.5-pro", // always fails schema validation
		// "google/gemini-2.5-flash", // always fails schema validation
		// "openai/gpt-4o", // sometimes fails schema validation
		// "openai/gpt-5", // sometimes replaces entire prompt
		// "google/gemini-3-pro-preview", // very bad at business_hours
		// "openai/gpt-5.2", // no major issues initially, but lately falling apart
		// "openai/gpt-5.4", // generally good, but hallucinates (while replicating large prompts)
		"openai/gpt-5.5",
		// "anthropic/claude-sonnet-4.6", // try this...
		// REMINDER: Removed retry models to be clear that initial model is actually doing the work correctly.
		// "openai/gpt-5.2-pro",
		// "google/gemini-3-pro-preview",
	),
	AgentUpdate_Conformer: register(
		// "google/gemini-3-pro-preview", // very bad at business_hours
		// "openai/gpt-5.2", // no major issues, but not perfect
		// "openai/gpt-5.4", // generally good, but hallucinates (while replicating large prompts)
		"openai/gpt-5.5",
		// "google/gemini-3.1-pro-preview", // try this...
		// "anthropic/claude-sonnet-4.6", // try this...
		// REMINDER: Removed retry models to be clear that initial model is actually doing the work correctly.
		// "openai/gpt-5.2-pro",
		// "google/gemini-3-pro-preview",
	),
	AgentUpdate_Decider: register(
		// "openai/gpt-5.2", // not bad
		// "google/gemini-3-pro-preview", // no issues yet, but slow
		"google/gemini-3-flash",
		"openai/gpt-5.4",
	),
	AgentUpdate_ReleaseNotes: register(
		//
		// "openai/gpt-5.4", // slow?
		// "google/gemini-3.1-flash", // has become slow... over 1m
		"google/gemini-3.5-flash", // ~2s
	),

	DemoGenerate: register(
		//
		// "openai/gpt-5.2",
		// "openai/gpt-5.2-pro",
		"openai/gpt-5.5",
		// "openai/gpt-5.5-pro", // expensive!
		// "google/gemini-3-pro-preview", // removed
		"google/gemini-3.1-pro-preview",
	),
	DemoScrape_Extractor: register(
		//
		"google/gemini-3-flash",
		// "google/gemini-3-pro-preview", // removed
		"google/gemini-3.1-pro-preview",
	),
	DemoScrape_Progress: register(
		//
		"google/gemini-3-flash",
	),

	SessionAnalysis: register(
		// "openai/gpt-4o", // random timeout (for relatively short calls)
		"anthropic/claude-opus-4.5", // great, but old now.
		"openai/gpt-5.2",
		"google/gemini-3-flash",
	),
	SessionFallback: register(
		//
		"google/gemini-3.5-flash",
	),
	SessionNotifier: register(
		// "google/gemini-3.1-flash-lite-preview", // ~0.9-1.6s, flaky
		// "google/gemini-3-flash", // ~2.5s-13s, flaky
		"openai/gpt-5.2", // ~2.1-2.5s, stable
	),
	SessionTranslate: register(
		//
		"anthropic/claude-opus-4.7", // accurate tone and nuance
		"openai/gpt-5.5", // faster
	),

	SimulationReporter: register(
		//
		"google/gemini-3.5-flash",
	),
	SimulationSoftChat: register(
		// "google/gemini-3-flash",
		// "google/gemini-3.1-flash-lite-preview", // generally good, but sometimes poor judgment
		"google/gemini-3.1-flash-lite",
		// "openai/gpt-5-nano",
	),
	SimulationSpecBuilder: register(
		//
		"openai/gpt-5.5",
	),
	SimulationTrigger_VersionHas: register(
		//
		"google/gemini-3.1-flash-lite-preview", // works.
	),

	TimeWindow_IsWindow: register(
		// TODO: reidenzon - Try gpt-5.3-instant when available.
		// "openai/gpt-5.1-instant", // ~1.5s
		// "google/gemini-3-flash", // ~2.2s
		// "google/gemini-3.1-flash-lite-preview", // ~0.8-1.1s, works but API is unstable
		"google/gemini-3.1-flash-lite", // ~0.7-1.2s, works!
	),

	TimeWindow_RuleGenerator: register(
		//
		// "openai/gpt-5-nano", // ~10-15s, works!
		"google/gemini-3.1-flash-lite", // ~1-2s, works!
	),
};

export const getAiModel = (tracer: ContextTracer, info: AiModelInfo): LanguageModel => {
	const ctx = tracer.ctx;
	const location = tracer.location;
	return createRetryable({
		model: info.model,
		onError: (context) => ctx.log.error({msg: "getAiModel.onError", location, context}),
		onRetry: (context) => ctx.log.warn({msg: "getAiModel.onRetry", location, context}),
		retries: info.retries,
	});
};

export const getAiModelFallback = (tracer: ContextTracer, model: AiModel | undefined, fallback: AiModelInfo): LanguageModel => {
	if (!model) return getAiModel(tracer, fallback);
	return getAiModel(tracer, register(model));
};
