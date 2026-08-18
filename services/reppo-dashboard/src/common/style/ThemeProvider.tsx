import { LocalStorage } from "@/src/common/adapters/local-storage/LocalStorage.ts";
import { Theme, ThemeContext, ThemeContextInterface } from "@/src/common/style/ThemeContext.ts";
import { consoleLog } from "@/src/common/utility/log/Log.ts";
import { ReactNode, useEffect, useState } from "react";

interface Props {
	children: ReactNode;
}

export const ThemeProvider = (p: Props) => {
	const themeStorage = localStorage.getItem(LocalStorage.Theme) as Theme | undefined;
	const [theme, setTheme] = useState<Theme | undefined>(themeStorage);

	const handleTheme = (theme: Theme) => {
		localStorage.setItem(LocalStorage.Theme, theme);
		setTheme(theme);
	};

	useEffect(() => {
		/**
		 * REMINDER:
		 * Storage events ONLY occur in a different window...
		 * so this code will run in another window.
		 */
		const onStorageEvent = (e: StorageEvent) => {
			consoleLog("ThemeProvider.onStorageEvent", e);
			if (e.key == LocalStorage.Theme) {
				handleTheme(e.newValue as Theme);
			}
		};
		window.addEventListener("storage", onStorageEvent);
		return () => {
			window.removeEventListener("storage", onStorageEvent);
		};
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme == Theme.Dark);
	}, [theme]);

	const context: ThemeContextInterface = {
		IsDark: theme == Theme.Dark,
		SetIsDark: (isDark) => handleTheme(isDark ? Theme.Dark : Theme.Light),
		Theme: theme ?? Theme.Light,
	};
	return <ThemeContext.Provider value={context}>{p.children}</ThemeContext.Provider>;
};
