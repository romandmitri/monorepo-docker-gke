import {PostHogProvider} from "@/src/common/adapters/posthog/PostHogProvider.tsx";
import {MicrophoneProvider} from "@/src/common/components/mic/MicrophoneProvider.tsx";
import {Toaster} from "@/src/common/components/shadcn/sonner.tsx";
import {ErrorBoundary} from "@/src/common/error/ErrorBoundary.tsx";
import {ErrorFallbackGlobal} from "@/src/common/error/ErrorFallbackGlobal.tsx";
import {setupGlobalErrorHandlers} from "@/src/common/error/ErrorService.ts";
import {ThemeProvider} from "@/src/common/style/ThemeProvider.tsx";
import {BrowserProvider} from "@/src/modules/browser/context/BrowserProvider.tsx";
import {ClipboardProvider} from "@/src/modules/clipboard/context/ClipboardProvider.tsx";
import {DeveloperProvider} from "@/src/modules/developer/context/DeveloperProvider.tsx";
import {RootProvider} from "@/src/modules/root/context/RootProvider.tsx";
import {CurrentSimulationRunProvider} from "@/src/modules/simulation/context/CurrentSimulationRunProvider.tsx";
import {SocketProvider} from "@/src/modules/socket/context/SocketProvider.tsx";
import {queryClient} from "@/src/modules/tankstack/query/query.ts";
import {router} from "@/src/modules/tankstack/router/router.tsx";
import {CurrentUserProvider} from "@/src/modules/user/context/CurrentUserProvider.tsx";
import {CurrentWorkspaceProvider} from "@/src/modules/workspace/context/CurrentWorkspaceProvider.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {Outlet, RouterProvider} from "@tanstack/react-router";
import {StrictMode} from "react";

setupGlobalErrorHandlers();

export const App = () => {
	return (
		<StrictMode>
			<PostHogProvider>
				<ErrorBoundary fallback={ErrorFallbackGlobal}>
					<RouterProvider router={router}/>
				</ErrorBoundary>
			</PostHogProvider>
		</StrictMode>
	);
};

export const AppRoot = () => {
	return (
		//
		<ClipboardProvider>
			<BrowserProvider>
				<QueryClientProvider client={queryClient}>
					<DeveloperProvider>
						<ThemeProvider>
							<MicrophoneProvider>
								<CurrentUserProvider>
									<SocketProvider>
										<RootProvider>
											<CurrentWorkspaceProvider>
												<CurrentSimulationRunProvider>
													<Outlet/>
												</CurrentSimulationRunProvider>
											</CurrentWorkspaceProvider>
										</RootProvider>
									</SocketProvider>
								</CurrentUserProvider>
							</MicrophoneProvider>
							<Toaster expand richColors position={"top-center"}/>
						</ThemeProvider>
					</DeveloperProvider>
				</QueryClientProvider>
			</BrowserProvider>
		</ClipboardProvider>
	);
};
