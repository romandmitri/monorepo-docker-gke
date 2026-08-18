import { createContext, useContext } from "react";

export enum Theme {
	Light = "light",
	Dark = "dark",
}

export interface ThemeContextInterface {
	IsDark?: boolean;
	SetIsDark: (is: boolean) => void;
	Theme?: Theme;
}

export const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);

export const useTheme = (): ThemeContextInterface => {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme() is NOT in <ThemeProvider />");
	return ctx;
};
