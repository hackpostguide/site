// app/providers.tsx
"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { UserContext } from "../lib/context";
import { useUserData } from '../lib/hooks';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
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
			<NextUIProvider navigate={router.push}>
				<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
			</NextUIProvider>
		</UserContext.Provider>
	);
}
