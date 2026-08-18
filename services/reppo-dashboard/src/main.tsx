import { App } from "@/src/App.tsx";
import { createRoot } from "react-dom/client";
import "@/src/common/style/globals.css";

const root = document.createElement("div");
root.className = "Root";
document.body.appendChild(root);

createRoot(root).render(<App />);
