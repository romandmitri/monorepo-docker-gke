import { ReactDiffViewerStylesOverride, ReactDiffViewerStylesVariables } from "react-diff-viewer-continued/lib/src/styles";

// TODO: reidenzon - See [theme.css] for appropriate key values.

// https://www.npmjs.com/package/react-diff-viewer-continued?activeTab=readme#overriding-styles
const variables: ReactDiffViewerStylesVariables = {
	diffViewerBackground: "var(--color-background)",
	diffViewerColor: "var(--color-foreground)",

	addedBackground: "color-mix(in srgb, var(--color-positive) 30%, transparent)",
	wordAddedBackground: "color-mix(in srgb, var(--color-positive) 30%, transparent)",

	removedBackground: "color-mix(in srgb, var(--color-destructive) 30%, transparent)",
	wordRemovedBackground: "color-mix(in srgb, var(--color-destructive) 20%, transparent)",

	codeFoldBackground: "var(--color-background)",
	codeFoldGutterBackground: "var(--color-background)",
	codeFoldContentColor: "var(--color-foreground)",
	emptyLineBackground: "var(--color-background)",

	gutterBackground: "var(--color-background)",
};

export const reactDiffViewerStyle: ReactDiffViewerStylesOverride = {
	variables: {
		dark: variables,
		light: variables,
	},
};
