import { useTheme } from "@/src/common/style/ThemeContext.ts";
import { Toaster as Sonner, ToasterProps } from "sonner";
import "sonner/dist/styles.css";

const Toaster = ({ ...props }: ToasterProps) => {
	const tc = useTheme();

	return (
		<Sonner
			theme={tc.Theme}
			className="toaster group"
			closeButton
			swipeDirections={["top", "left", "right"]}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

export { Toaster };
