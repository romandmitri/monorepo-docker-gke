import type {Metadata} from "next";
import "@/src/app/globals.css";


export const metadata: Metadata = {
	title: "REPPO",
};

export default function RootLayout(p: LayoutProps<"/">) {
	return (
		<html lang="en" className={`dark h-full antialiased`}>
		<body className="flex min-h-full flex-col">{p.children}</body>
		</html>
	);
}
