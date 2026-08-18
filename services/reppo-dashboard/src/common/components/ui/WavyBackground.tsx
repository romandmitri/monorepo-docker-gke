import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

const WAVE_COLORS = ["#43E5A4", "#5eead4", "#14b8a6", "#0d9488"];

interface WavyBackgroundProps {
	children?: ReactNode;
	className?: string;
	containerClassName?: string;
	waveWidth?: number;
	blur?: number;
	speed?: "slow" | "fast";
	waveOpacity?: number;
}

export const WavyBackground = ({
	children,
	className,
	containerClassName,
	waveWidth,
	blur = 10,
	speed = "fast",
	waveOpacity = 0.5,
}: WavyBackgroundProps) => {
	const noiseRef = useRef(createNoise3D());
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationIdRef = useRef<number>(0);
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
	const bgFillRef = useRef("#022c22");
	const dimensionsRef = useRef({ w: 0, h: 0, nt: 0 });
	const [isCanvasReady, setIsCanvasReady] = useState(false);

	const getSpeed = () => {
		switch (speed) {
			case "slow":
				return 0.001;
			case "fast":
				return 0.002;
			default:
				return 0.001;
		}
	};


	const drawWave = (n: number) => {
		const ctx = ctxRef.current;
		if (!ctx) return;

		const { w, h } = dimensionsRef.current;
		const noise = noiseRef.current;
		dimensionsRef.current.nt += getSpeed();
		const nt = dimensionsRef.current.nt;

		for (let i = 0; i < n; i++) {
			ctx.beginPath();
			ctx.lineWidth = waveWidth || 50;
			ctx.strokeStyle = WAVE_COLORS[i % WAVE_COLORS.length];
			for (let x = 0; x < w; x += 5) {
				const y = noise(x / 800, 0.3 * i, nt) * 100;
				ctx.lineTo(x, y + h * 0.5);
			}
			ctx.stroke();
			ctx.closePath();
		}
	};

	const render = () => {
		const ctx = ctxRef.current;
		const canvas = canvasRef.current;
		if (!ctx || !canvas) return;

		const { w, h } = dimensionsRef.current;

		ctx.clearRect(0, 0, w, h);

		ctx.fillStyle = bgFillRef.current;
		ctx.globalAlpha = 0.7;
		ctx.fillRect(0, 0, w, h);

		ctx.globalAlpha = waveOpacity || 0.5;
		drawWave(5);

		animationIdRef.current = requestAnimationFrame(render);
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctxRef.current = ctx;

		bgFillRef.current = getComputedStyle(canvas).getPropertyValue("--background").trim() || "#022c22";

		const updateCanvasSize = () => {
			if (!canvas.parentElement) return;

			const rect = canvas.parentElement.getBoundingClientRect();
			dimensionsRef.current.w = ctx.canvas.width = rect.width;
			dimensionsRef.current.h = ctx.canvas.height = rect.height;
			ctx.filter = `blur(${blur}px)`;
		};

		updateCanvasSize();
		dimensionsRef.current.nt = 0;

		window.addEventListener("resize", updateCanvasSize);

		// Pre-render a frame to avoid flash
		drawWave(5);
		setIsCanvasReady(true);
		render();

		return () => {
			cancelAnimationFrame(animationIdRef.current);
			window.removeEventListener("resize", updateCanvasSize);
		};
	}, []);

	const [isSafari, setIsSafari] = useState(false);
	useEffect(() => {
		setIsSafari(typeof window !== "undefined" && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome"));
	}, []);

	return (
		<div
			className={cn("relative h-full w-full bg-background", containerClassName)}
		>
			<canvas
				className={cn("absolute inset-0 h-full w-full", isCanvasReady ? "opacity-100" : "opacity-0")}
				ref={canvasRef}
				id="canvas"
				style={{
					...(isSafari ? { filter: `blur(${blur}px)` } : {}),
					transition: "opacity 0.5s ease-in-out",
				}}
			></canvas>
			{children && <div className={cn("relative z-10", className)}>{children}</div>}
		</div>
	);
};
