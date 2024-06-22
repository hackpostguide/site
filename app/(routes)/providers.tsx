// app/providers.tsx
"use client";

import * as React from "react";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { UserContext } from "../../lib/context";
import { useUserData } from '../../lib/hooks';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ThemeProvider } from "./theme-provider";

// export interface ProvidersProps {
// 	children: React.ReactNode;
// 	themeProps?: ThemeProviderProps;
// }

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const userData = useUserData();

	return (
		<UserContext.Provider value={userData}>
			<ProgressBar
				height="4px"
				color="#006FEE"
				options={{ showSpinner: false }}
				shallowRouting
			/>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				{children}
          	</ThemeProvider>
		</UserContext.Provider>
	);
}
